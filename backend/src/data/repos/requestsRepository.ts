import formidable from "formidable";
import moment from "moment";
import {
	Contest,
	statuses
} from "../models/contest";
import { dbCreateConnection } from "../dbCreateConnection";
import { postgres, s3Conf } from "../../server";
import { readFile } from "fs";
import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { UserInfo } from "../models/userInfo";
import { Requests } from "../models/requests";
import { Users } from "../models/users";

interface AfterCheck {
	nomination_id: number,
	filesFromReq: unknown[],
	files: formidable.Files[];
	contestYear: number;
	activeContest: Contest
}
interface InfoByNomId {
	direction_name: string;
	nomination_name: string;

}
export interface InfoForUpload {
	nomination_id: number,
	files: formidable.Files[],
	contestYear: number,
	username: string,
	login: string,
	group_code: string | [string, UserInfo],
	faculty: string | [string, UserInfo];
}
interface BucketParams {
	Bucket: string,
	Key: string,
	Body: Buffer,
}

class RequestsRepository {

	public async checkBeforeUpload(req: any): Promise<AfterCheck> {
		//Отличный пример использования промиса.
		//Так как form.parse ничего не возвращает и работает в синхронном режиме, то просто async/await нам не вытащить форму.
		//А нам надо как-то вытащить оттуда файл и поле.

		const inputInfo = await new Promise<AfterCheck>((resolve, reject) => {
			const form = formidable();
			let result: AfterCheck = {
				nomination_id: 0,
				filesFromReq: [],
				files: [],
				contestYear: 2023,
				activeContest: new Contest()
			};


			form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
				if (err)
					reject("Request create error");

				result.nomination_id = +fields["nomination_id"][0];
				result.filesFromReq = files["files"];
				result.files = result.filesFromReq as formidable.Files[];
				result.contestYear = Number(moment().utcOffset(6).format("yyyy"));
				resolve(result);
			});
		});

		let activeContest;
		if (inputInfo.filesFromReq.length === 0)
			throw new Error("files are missing");

		try {
			activeContest = await Contest.findOne({ where: { year: inputInfo.contestYear } });
		} catch (e: any) {
			throw new Error("Contest not found by given year");
		}

		if (activeContest === null)
			throw new Error("Конкурс не создан!");
		else 
			inputInfo.activeContest = activeContest;

		switch (activeContest.status) {
		case statuses.contestEnded:
			throw new Error("Конкурс завершён!");
		case statuses.selectWinners:
			throw new Error("Загрузка файлов недоступна! Идёт выбор победителей.");
		case statuses.uploadWorks: {
			break;
		}
		default:
			break;
		}
		return inputInfo;

	}

	public async uploadFiles(info: InfoForUpload): Promise<void> {
		const connection = await dbCreateConnection(postgres),
			{
				nomination_id,
				files,
				contestYear,
				login,
				username,
				group_code,
				faculty
			} = info;
		let infoByNomId: InfoByNomId[];
		try {
			infoByNomId = await connection.query("SELECT d.direction_name, nomination_name FROM nominations INNER JOIN directions d USING(direction_id) WHERE nomination_id=$1", [nomination_id]);
		} catch (e: any) {
			throw new Error("InfoByNomId not found");
		}
		const { direction_name, nomination_name } = infoByNomId[0];

		for (const file of files) {
			const filepath = file["filepath"] as unknown,
				path = filepath as string,
				filename = file["originalFilename"] as unknown,
				arrayFilename = filename as string,
				extension = arrayFilename.split(".").pop(),
				conf = {
					region: s3Conf.region,
					credentials: {
						accessKeyId: s3Conf.accessKeyId,
						secretAccessKey: s3Conf.secretAccessKey,
					},
					forcePathStyle: true,
					endpoint: s3Conf.endpoint
				} as unknown;
			const s3c = conf as [] | [S3ClientConfig],
				s3 = new S3Client({...s3c}),
				timestamp = moment().utcOffset(6).format("yyyy-MM-DD_HH:mm:ss_x"),
				pathForBucket = `${contestYear}/${direction_name}/${username} ${login} ${group_code} ${faculty}/${nomination_name}/doc_${timestamp}.${extension}`;
			let params: BucketParams = {
				Bucket: s3Conf.Bucket,
				Key: pathForBucket,
				Body: Buffer.from("")
			};
			const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
				readFile(path, (err, fileBuffer) => {
					if (err)
						reject("reading file error");
					resolve(fileBuffer);

				});
			});
			params.Body = fileBuffer;
			const uploadCommand = new PutObjectCommand(params);
			s3.send(uploadCommand)
				.then(() => {
					//
				})
				.catch(err => {
					console.error("Error uploading:", err);
				});
		}
	}

	public async createRecordsInDB(activeContest: Contest/*, user_id: number*/) {
		try {
			const user = await Users.findOne({where:{user_id: 1}});
			const request = new Requests();
			if (user === null)
				throw new Error("User not found by given user_id");
			request.user = user;
			request.contest = activeContest;

			/*const savedUser = await request.save();*/

		} catch (e: any) {
			throw new Error("Contest not found by given year");
		}
		return 1;
	}
}
export default new RequestsRepository();

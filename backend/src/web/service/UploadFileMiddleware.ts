/** 
	/backend/src/web/service/UploadFileMiddleware.ts - Store for file upload middleware
	Copyright (C) 2023  Ilya Zhukov <ilyazhukov24@gmail.com>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
import formidable from "formidable";
import moment from "moment";

interface AfterCheck {
	nomination_id: number,
	filesFromReq: unknown[],
	files: formidable.Files[];
	contestYear: number;
}

export const file = function (req: any, res: any, next: any) {
	
	const form = formidable();

	form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
		if (err)
			next("Request create error");
		let result: AfterCheck = {
			nomination_id: 0,
			filesFromReq: [],
			files: [],
			contestYear: 2023,
		};
		result.nomination_id = +fields["nomination_id"][0];
		result.filesFromReq = files["files"];
		result.files = result.filesFromReq as formidable.Files[];
		result.contestYear = Number(moment().utcOffset(6).format("yyyy"));
		res.locals.form = result;
		next();
	});
	

};

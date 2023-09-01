/** 
	/backend/src/data/passport.ts - OAuth2 config 
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
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import { passportCreds, API } from "../server";
import decode from "jwt-decode";
import { Users } from "./models/users";
import { UserInfo } from "./models/userInfo";
import https from "https";
import axios from "axios";

interface Payload {
	unique_name: string,
	commonname: string,
	upn: string
}
export interface User {
	user_id: number
	login: string,
	name: string,
	role: string,
	group_code: string | [string, UserInfo],
	faculty: string | [string, UserInfo]
}
interface UserFromAPI{
	data:{
		students: Student[]
	}
}
interface Student{
	studentID: number,
	lastName: string,
	firstName: string,
	surName: string,
	studies: Study[],
	sexID: number
}
interface Study{
	groups:{
		groupID: number,
		code: string,
		curriculum: {
			departmentID: string
		}
	}
}
interface Info{
	student_id: number,
	full_name: string,
	group_id: number,
	group_code: string
	sex: number,
	school: string
}
interface School{
	data:{
		departments: Department[]
	}
}
interface Department{
	name: string
}
type Props = {
	[x : string] : string
}

const strategyCallback = async function (_: any, __: any, refreshToken: any, ___: any, done: any): Promise<void> {

	const payloadJwt = refreshToken.id_token,
		payload : Payload = decode(payloadJwt),
		login = payload.unique_name,
		email = payload.upn,
		slicedLogin = login.slice(5),
		sex = ["", "F", "M"];
	let findedUser: Users | null,
		lowerLogin = "",
		user_name = payload.commonname;
		

	if(slicedLogin !== undefined) {
		try {
			lowerLogin = slicedLogin.toLowerCase();
			findedUser = await Users.findOne({
				relations:{
					info: true
				},
				where:{
					login: lowerLogin
				}
			});
		} catch(e:any) {
			throw new Error(e);
		}
	} else {
		throw new Error("missing uniquename in payload");
	}
	
	if(findedUser === null) {
		const user = new Users();
		user.login = lowerLogin;
		user.email = email;
		let infoByLogin;
		try {
			infoByLogin = await axios.get(API + `&query={
				students(
					where: { 
						login: { 
							contains: "${slicedLogin}"
						}
					}
					) {
						studentID,
						lastName,
						firstName,
						surName,
						studies {
							groups {
								groupID,
								code,
								curriculum {
									departmentID
								}
							}
						},
						sexID
					}
			}`,
			{
				httpsAgent: new https.Agent({
					rejectUnauthorized: false
				})
			});
		} catch(e:any) {
			throw new Error("Api error" + e);
		}

		if(infoByLogin !== undefined)
		{
			const data = infoByLogin.data as UserFromAPI,
				[student] = data.data.students,
				[group] = student.studies,
				{ groupID, code, curriculum } = group.groups,
				{ departmentID } = curriculum,
				{ lastName, firstName, surName } = student,
				userName = `${lastName} ${firstName}`,
				full_name = `${userName} ${surName}`;
			let school,
				savedUser: Users,
				user_id: number;
			try {
				school = await axios.get(API + `&query={
						departments(
							where: {
								departmentID:{
									eq: ${+departmentID}
								}
							}
						){
							name
						}
					}`,
				{
					httpsAgent: new https.Agent({
						rejectUnauthorized: false
					})
				});
			} catch(e:any) {
				throw new Error("Api error" + e);
			}
			const dep = school.data as School,
				[department] = dep.data.departments,
				dep_name = department.name,
				infoForSaving = {
					student_id: student.studentID,
					group_id: groupID,
					group_code: code,
					full_name: full_name,
					school: dep_name,
					sex: student.sexID
					
				} as Info,
				arrayInfo = Object.entries(infoForSaving);

				
			user.info = arrayInfo.map((value: any)=>{
				if (String(value[0]) === "sex") value[1] = sex[value[1]];

				const userInfo = new UserInfo();
				userInfo.user = user;
				userInfo.parameterName = String(value[0]);
				userInfo.value = value[1];
				return userInfo;
			});
			user.user_name = userName;

			try {
				savedUser = await user.save();
				user_id = savedUser.user_id;
			} catch(e:any) {
				throw new Error("User save error" + e);
			}
			if (user_name === undefined)
				user_name = userName;
			const scope : User = {
				user_id: user_id,
				login: user.login,
				name : user_name,
				role: user.role,
				group_code: code,
				faculty: dep_name
			};
			done(null, scope);
		} else {
			throw new Error("API has broken");
		}
	} else {
		const arrayInfo = Object.entries(findedUser.info),
			temp = ["group_code", "school"];
		let props : Props = {};
		for (let element of arrayInfo) {
			const unknownCurrent = element[1],
				currentKey = unknownCurrent["parameterName"] as string,
				currentValue = unknownCurrent["value"] as string;
			if (temp.includes(currentKey)) {
				props[currentKey] = currentValue;
			}
		}
		const scope : User = {
			user_id: findedUser.user_id,
			login: findedUser.login,
			name : findedUser.user_name,
			role: findedUser.role,
			group_code: props["group_code"],
			faculty: props["school"]
		};
		done(null, scope);
	}
			
};

const strategy = new OAuth2Strategy({ ...passportCreds }, strategyCallback);

passport.use("login", strategy);

passport.serializeUser(function (user: any, done: any) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
	done(null, user);
});

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
import { passportCreds } from "../server";
import decode from "jwt-decode";
import { Users } from "./models/users";

interface Payload {
	unique_name: string,
	commonname: string,
	upn: string
}
export interface User {
	login: string,
	role: string,
}
const strategyCallback = async function (_: any, __: any, refreshToken: any, ___: any, done: any) {

	const payloadJwt = refreshToken.id_token,
		payload : Payload = decode(payloadJwt),
		login = payload.unique_name,
		email = payload.upn,
		user_name = payload.commonname;
	let findedUser: Users | null,
		lowerLogin = "";

	if(login !== undefined) {
		try {
			const tempArray = login.split("\\");
			const newLogin = tempArray.pop(); 
			if(newLogin !== undefined)
				lowerLogin = newLogin.toLowerCase();
			try {
				findedUser = await Users.findOne({
					where:{
						login: lowerLogin
					}
				});
			} catch(e:any) {
				throw new Error(`${e}`);
			}
		} catch(e:any) {
			throw new Error(e);
		}
	} else {
		throw new Error("missing uniquename in payload");
	}
	
	if(findedUser === null) {
		const user = new Users();
		user.user_name = user_name;
		user.login = lowerLogin;
		user.email = email;
		await user.save();
		const scope : User = {
			login: user.login,
			role: user.role,
		};
		done(null, scope);
	} else {
		const scope : User = {
			login: findedUser.login,
			role: findedUser.role,
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

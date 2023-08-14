/** 
	/backend/src/web/service/AuthMiddlewares.ts - Store for auth middlewares
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
import { userRolesConfig } from "../../data/userRoles";

const { accessLevels } = userRolesConfig;
type accessLevel = keyof typeof userRolesConfig.accessLevels;

export const allow = function (accessLevel: accessLevel, callback: any) {
	function checkUserRole(req: any, res: any) {
		const role: accessLevel = req.user.role;
		const accessLevelByInputRole = accessLevels[accessLevel];
		if (!accessLevelByInputRole.includes(role)) {
			res.status(403).send(`Unautorized! IP Address: ${req.ip}`);
			return;
		}

		callback(req, res);
	}

	return checkUserRole;
};

export const isAuth = (req: any, res: any, next: any) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/auth");
	}
};

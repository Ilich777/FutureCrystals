/** 
	/backend/src/data/userRoles.ts - Store for user roles
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
type UserRoles = {
	roles: typeof roles,
	accessLevels: typeof accessLevels
}

const roles = {
	student: "student",
	operator: "operator",
	admin: "admin"
};

const accessLevels = {
	student: [ roles.student, roles.operator, roles.admin ],
	operator: [ roles.operator, roles.admin ],
	admin: [ roles.admin ]
};

export const userRolesConfig : UserRoles = {
	roles: roles,
	accessLevels: accessLevels
};

/** 
	/backend/src/data/dbCreateConnection.ts - Connection config
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
import { DataSource } from "typeorm";
import { Config } from "./types/Config";
export const dbCreateConnection = async (postgres: Config["postgres"]): Promise<DataSource>=> {
	const ds = new DataSource({
		type: postgres.type,
		host: postgres.host,
		database: postgres.database,
		username: postgres.username,
		password: postgres.password,
		synchronize: postgres.synchronize,
		logging: postgres.logging,
		entities: postgres.entities
	});
	const connection = ds;
	await connection.initialize()
		.then(() => {
			console.log("DB Connected");
		})
		.catch((er) => {
			console.log(er);
		});
	return ds;
};

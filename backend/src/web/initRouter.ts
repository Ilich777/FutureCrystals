/** 
	/backend/src/web/initRouter.ts - Initialization management router
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
import { Router, Request, Response } from "express";
import { 
	allow,
	isAuth 
} from "./service/AuthMiddlewares";
import directionRepository from "../data/repos/directionRepository";
enum InitStatus {
	true = "Ok",
	false = "Already exists"
}

const initRouter = Router();

initRouter.get("/", 
	isAuth, 
	allow("admin", async (_: Request , res: Response) => {
		try{
			const dr = await directionRepository.init();

			const status = dr; //&& dr2
			if (status)
				res.status(201).json(InitStatus.true);
			else
				res.status(400).json(InitStatus.false);

		} catch(e:any){
			console.log(e.message);
		}
	}));
	

export { initRouter };

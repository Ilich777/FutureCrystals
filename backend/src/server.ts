/** 
	/backend/src/server.ts - Main file for initializing and start project
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
//подключение модулей
import express, {Express} from "express";
import bodyParser from "body-parser";
import { env } from "process";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import path from "path";

const app : Express = express(),
	server = http.createServer(app);

export const io = new Server(server);
const s1 = io.of(/^\/[A-Z]{1}$/);
const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200
};

import { Config } from "./data/types/Config";
import { StrategyOptions } from "passport-oauth2";

export interface User {
foobar: string;
}


//Без этого работать не будет
let PORT: Config["PORT"] = 3500,
	postgres: Config["postgres"] = {
		type: "postgres",
		host: "test.test",
		username: "test",
		password: "test",
		database: "test",
		synchronize: true,
		logging: false,
		entities: ["test1"]
	},
	sessionOption: session.SessionOptions = {
		secret: "test",
		cookie: {
			domain: "test",
			httpOnly: true,
			maxAge: 3600000,
			path: "test",
			sameSite: "lax"
		},
		name: "test",
		resave: false,
		rolling: true,
		saveUninitialized:false
	},
	passportCreds: StrategyOptions,
	s3Conf: Config["s3Conf"],
	API: Config["API"];

export { passportCreds, postgres, s3Conf, API };

//импорт роутеров
import { initRouter } from "./web/initRouter";
import { requestsRouter } from "./web/requestsRouter";
import { authRouter } from "./web/authRouter";
import { userRouter } from "./web/userRouter";
import { directionRouter } from "./web/directionRouter";
import { nominationRouter } from "./web/nominationRouter";

import { allow, isAuth } from "./web/service/AuthMiddlewares";

if (!Object.hasOwn(env, "NODE_ENV") || env["NODE_ENV"] == "development") {
	console.log("Development mode");
	
	// подключение конфига
	const { config } = require("./data/conf/config");
	passportCreds = config.passportCreds;
	PORT = config.PORT;
	postgres = config.postgres;
	sessionOption = config.sessionOption;
	s3Conf = config.s3Conf;
	API = config.API;
	env["isProd"] = "false";
	
} else if (env["NODE_ENV"] == "production") {
	console.log("Production mode");
	PORT = Number(env["PORT"] !== undefined ? env["PORT"] : "3500");
	postgres = JSON.parse(env["POSTGRES"]!== undefined ? env["POSTGRES"] : "{}");
	sessionOption = JSON.parse(env["SESSION"]!== undefined ? env["SESSION"] : "{}");
	passportCreds = JSON.parse(env["OAuth2Creds"]!== undefined ? env["OAuth2Creds"] : "{}");
	s3Conf = JSON.parse(env["S3CONFIG"]!== undefined ? env["S3CONFIG"] : "{}");
	API = env["API"] !== undefined ? env["API"] : "";
	env["isProd"] = "true";
}
const FileStore = sessionFileStore(session);
const sess = Object.assign(sessionOption, { store: new FileStore({path: "./backend/sessions"}) });
//middlewares
app.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(morgan("dev"))
	.use(cookieParser())
	.use(session(sess))
	.use(passport.initialize())
	.use(passport.session())
	.use(cors(corsOptions));

	
app.get("/", 
	isAuth, 
	allow("student"), function (_:any, res:any) {
		res.sendFile(path.join(__dirname, "..", "..", "frontend", "build", "index.html"));
	});
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
	
//импорт подключения к PostgreSQL
import { dbCreateConnection } from "./data/dbCreateConnection";
import "./data/passport";

export const ds = dbCreateConnection(postgres)
	.then(() => {
		s1.on("connection", (socket) => {
			console.log(`a user ${socket.nsp.name[1]} connected`);
			/*socket.on("connection", (socket) => {
				console.log("a user connected");
			});*/
			socket.on("disconnect", () => {
				console.log(`a user ${socket.nsp.name[1]} disconnected`);
			});
		});

		//подключение роутеров к эндпоинтам
		app.use("/auth", authRouter);
		app.use("/init", initRouter);
		app.use("/requests", requestsRouter);
		app.use("/users", userRouter);
		app.use("/directions", directionRouter);
		app.use("/nomination", nominationRouter);
	});

server.listen(PORT, async () => {
	if(env["isProd"] === "false"){
		console.log(`Server started at http://localhost:${PORT}`);
		console.log(" ");
		console.log("Build TypeScript in watch mode:");
		console.log("npm run devBuild --prefix backend");
		console.log(" ");
		console.log("Build React:");
		console.log("npm run build --prefix frontend");
		console.log(" ");
		console.log("Start server:");
		console.log("F5");
	} else 
		console.log("");
});

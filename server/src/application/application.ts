import express, {Express} from "express";
import {requireHTTPS} from "./middleware";
import {reactDir} from "../globals";
import {loginUser, logoutUser, postCrumb, reactApp, registerUser, renewUserToken} from "./controllers";
import http from "http";
import https from "https";
import {ConfigSettings} from "./config";
import cookieParser from "cookie-parser";

export class Application {
    #config: ConfigSettings;
    #app: Express;
    #httpServer: http.Server | undefined;
    #httpsServer: https.Server | undefined;

    constructor (config: ConfigSettings) {
        this.#config = config;
        this.#app = express();
        this.#initRouting();
    }

    #initRouting() {
        let router = express.Router()
            .use(requireHTTPS)
            .use(express.static(reactDir))
            .use(express.json())
            .use(cookieParser())
            .use(this.#config.loginService.tokenParser())
            .get('*', reactApp)
            .post('/api/register', registerUser(this.#config.registrationService))
            .post('/api/login', loginUser(this.#config.loginService))
            .post('/api/logout', logoutUser(this.#config.loginService))
            .post('/api/renew', renewUserToken(this.#config.loginService))
            .post('/api/postCrumb', postCrumb());

        this.#app.use('/', router);
    }

    #startHTTP() {
        this.#httpServer = http.createServer(this.#app).listen(80);
    }

    #startHTTPS() {
        this.#httpsServer = https.createServer(
            {key: this.#config.httpsPrivateKey, cert: this.#config.httpsCertificate},
            this.#app)
            .listen(443, () => {
                console.log(`Server running at https://localhost`);}
            );
    }
    public run() {
        this.#startHTTP();
        this.#startHTTPS();
    }


     setConfigAndReboot(config: ConfigSettings) {
        this.#config = config;
        this.#initRouting();
        this.#httpServer?.close(() => {this.#startHTTP()});
        this.#httpsServer?.close(() => {this.#startHTTPS()});
    }

}
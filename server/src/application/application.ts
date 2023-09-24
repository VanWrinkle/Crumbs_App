import express, {Express} from "express";
import {requireHTTPS} from "./middleware";
import {reactDir} from "../globals";
import {loginUser, reactApp, registerUser} from "./controllers";
import http from "http";
import https from "https";
import {ConfigSettings} from "./config";


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
            .get('/', reactApp)
            .post('/register', registerUser(this.#config.registrationService))
            .post('/login', loginUser(this.#config.loginService));

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
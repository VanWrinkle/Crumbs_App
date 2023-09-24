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

    public Run() {
        http.createServer(this.#app).listen(80);
        https.createServer(
            {key: this.#config.httpsPrivateKey, cert: this.#config.httpsCertificate},
            this.#app)
            .listen(443, () => {
            console.log(`Server running at https://localhost`);}
            );
    }

}
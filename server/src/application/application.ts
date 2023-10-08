import express, {Express} from "express";
import {requireHTTPS} from "./middleware";
import {reactDir} from "../globals";
import {
    loginUser,
    logoutUser,
    postCrumb,
    reactApp,
    registerUser,
    renewUserToken,
    getMainFeed,
    setLike,
    setFollow,
    getUserFeed, deleteUser
} from "./controllers";
import http from "http";
import https from "https";
import {ConfigSettings} from "./config";
import cookieParser from "cookie-parser";
import {NeoGraphPersistence} from "../ISocialGraphPersistence/NeoGraphPersistence/NeoGraphPersistence";

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
            .get('/api/getMainFeed', getMainFeed(new NeoGraphPersistence()))
            .get('/api/getUserFeed', getUserFeed(new NeoGraphPersistence()))
            .get('*', reactApp)
            .post('/api/register', registerUser(this.#config.registrationService))
            .delete('/api/deleteUser', deleteUser(new NeoGraphPersistence()))
            .post('/api/login', loginUser(this.#config.loginService))
            .post('/api/logout', logoutUser(this.#config.loginService))
            .post('/api/renew', renewUserToken(this.#config.loginService))
            .post('/api/postCrumb', postCrumb(new NeoGraphPersistence())) //TODO: Inject
            .post('/api/likeCrumb', setLike(new NeoGraphPersistence(), true))
            .delete('/api/likeCrumb', setLike(new NeoGraphPersistence(), false))
            .post('/api/followUser', setFollow(new NeoGraphPersistence(), true))
            .delete('/api/followUser', setFollow(new NeoGraphPersistence(), false))

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
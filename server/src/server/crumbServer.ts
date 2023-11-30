import express, {Express} from "express";
import {requireHTTPS, responseLogger} from "./middleware";
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
    getUserFeed,
    deleteUser,
    getReplies,
    getProfileInfo
} from "./controllers";
import http from "http";
import https from "https";
import {ConfigSettings} from "../entities/ConfigSettings";
import cookieParser from "cookie-parser";




/**
 * Server is a class wrapping the build-up of the server context and injection
 * of dependencies such as Databases and business logic classes.
 */
export class CrumbServer {
    #config: ConfigSettings; // Object containing injected dependencies
    app: Express;           // The express instance used by the server.
    #httpServer: http.Server | undefined;
    #httpsServer: https.Server | undefined;

    constructor (config: ConfigSettings) {
        this.#config = config;
        this.app = express();
        this.#initRouting();
    }


    /**
     * Setup of the client-server API routing and serving of files to visitors.
     * @private
     */
    #initRouting() {
        let router = express.Router()
            .use(requireHTTPS)
            .use(express.static(reactDir))
            .use(express.json())
            .use(cookieParser())
            .use(responseLogger)
            .use(this.#config.loginService.tokenParser())
            .get("/api/getProfileInfo", getProfileInfo(this.#config.graphPersistence))
            .get('/api/getMainFeed', getMainFeed(this.#config.graphPersistence))
            .get('/api/getUserFeed', getUserFeed(this.#config.graphPersistence))
            .get('/api/getReplies', getReplies(this.#config.graphPersistence))
            .get('*', reactApp)
            .post('/api/register', registerUser(this.#config.registrationService))
            .delete('/api/deleteUser', deleteUser(this.#config.registrationService, this.#config.loginService))
            .post('/api/login', loginUser(this.#config.loginService))
            .post('/api/logout', logoutUser(this.#config.loginService))
            .post('/api/renew', renewUserToken(this.#config.loginService))
            .post('/api/postCrumb', postCrumb(this.#config.graphPersistence)) //TODO: Inject
            .post('/api/likeCrumb', setLike(this.#config.graphPersistence, true))
            .delete('/api/likeCrumb', setLike(this.#config.graphPersistence, false))
            .post('/api/followUser', setFollow(this.#config.graphPersistence, true))
            .delete('/api/followUser', setFollow(this.#config.graphPersistence, false))

        this.app.use('/', router);
    }


    /**
     * Startup of the http server
     * @private
     */
    #startHTTP() {
        this.#httpServer = http.createServer(this.app).listen(80);
    }


    /**
     * Startup of the https server
     * @private
     */
    #startHTTPS() {
        this.#httpsServer = https.createServer(
            {key: this.#config.httpsPrivateKey, cert: this.#config.httpsCertificate},
            this.app)
            .listen(443, () => {
                console.log(`Server running at https://localhost`);}
            );
    }


    /**
     * Starts the http and https servers used to serve the client-server API
     */
    public run() {
        this.#startHTTP();
        this.#startHTTPS();
    }

    /**
     * Stops the http and https servers used to serve the client-server API
     */
    public async stop() {
        await this.#httpServer?.close();
        await this.#httpsServer?.close();
    }


     setConfigAndReboot(config: ConfigSettings) {
        this.#config = config;
        this.#initRouting();
        this.#httpServer?.close(() => {this.#startHTTP()});
        this.#httpsServer?.close(() => {this.#startHTTPS()});
    }

}
import {IUserLoginService} from "./IUserLoginService";
import {IUserDatabase} from "../IUserDatabase/IUserDatabase";
import bcrypt from "bcrypt";
import {StoredUserData} from "../IUserDatabase/StoredUserData";
import {IUserAuthentionService} from "../IUserAuthenticationService/IUserAuthentionService";
import e from "express";


export class LoginService implements IUserLoginService {
    #persistence: IUserDatabase;
    #session: IUserAuthentionService;

    constructor(persistence: IUserDatabase, session: IUserAuthentionService) {
        this.#persistence = persistence;
        this.#session = session;
    }

    async retrieveUserData(name: string): Promise<StoredUserData | undefined> {
        return this.#persistence.getUser(name);
    };

    async validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean> {
        return bcrypt.hash(password, userData.salt).then(hash => {
            return (userData.hash === hash)
        })
    }

    sendSessionToken(username: string, response: e.Response) {
        this.#session.sendToken(username, response)
    }

    clearSessionToken(response: e.Response) {
        this.#session.clearSessionToken(response)
    }

    tokenParser() {
        return this.#session.tokenParser()
    }

}
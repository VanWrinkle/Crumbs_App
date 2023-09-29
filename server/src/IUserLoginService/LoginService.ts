import {IUserLoginService} from "./IUserLoginService";
import {IUserDatabase} from "../IUserDatabase/IUserDatabase";
import bcrypt from "bcrypt";
import {StoredUserData} from "../IUserDatabase/StoredUserData";
import {IUserAuthenticator} from "../IUserAuthenticator/IUserAuthenticator";
import e from "express";


export class LoginService implements IUserLoginService {
    #persistence: IUserDatabase;
    #session: IUserAuthenticator;

    constructor(persistence: IUserDatabase, session: IUserAuthenticator) {
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

    sendSessionToken(userData: StoredUserData, response: e.Response) {
        this.#session.sendToken(userData, response)
    }

    clearSessionToken(response: e.Response) {
        this.#session.clearSessionToken(response)
    }
}
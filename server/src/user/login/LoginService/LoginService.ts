import {ILoginService} from "../../../contracts/ILoginService";
import {ICredentialsPersistence} from "../../../contracts/ICredentialsPersistence";
import bcrypt from "bcrypt";
import {UserRegistration} from "../../../entities/UserRegistration";
import {IAuthenticationService} from "../../../contracts/IAuthenticationService";
import e from "express";


export class LoginService implements ILoginService {
    #persistence: ICredentialsPersistence;
    #session: IAuthenticationService;

    constructor(persistence: ICredentialsPersistence, session: IAuthenticationService) {
        this.#persistence = persistence;
        this.#session = session;
    }

    async retrieveUserData(name: string): Promise<UserRegistration | undefined> {
        return this.#persistence.getUser(name);
    };

    async validateUserCredentials(userData: UserRegistration, password: string): Promise<boolean> {
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
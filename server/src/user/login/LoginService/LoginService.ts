import {IUserLoginService} from "../../../contracts/IUserLoginService";
import {IUserRegistrationDatabase} from "../../../contracts/IUserRegistrationDatabase";
import bcrypt from "bcrypt";
import {UserRegistration} from "../../../entities/UserRegistration";
import {IUserAuthenticationService} from "../../../contracts/IUserAuthenticationService";
import e from "express";


export class LoginService implements IUserLoginService {
    #persistence: IUserRegistrationDatabase;
    #session: IUserAuthenticationService;

    constructor(persistence: IUserRegistrationDatabase, session: IUserAuthenticationService) {
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
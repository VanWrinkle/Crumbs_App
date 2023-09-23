import {LoginService} from "./loginService";
import {StoredUserData, UserDatabase} from "../userDatabase/userDatabase";
import bcrypt from "bcrypt";

export class MDBLoginService implements LoginService {
    #persistence: UserDatabase;

    constructor(persistence: UserDatabase) {
        this.#persistence = persistence;
    }
    async retrieveUserData(name: string): Promise<StoredUserData | undefined> {
        return this.#persistence.getUser(name);
    };
    async validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean> {
        return bcrypt.hash(password, userData.salt).then( hash => {
            return (userData.hash === hash)
        })
    }
}
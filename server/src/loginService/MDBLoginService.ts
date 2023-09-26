import {LoginService} from "./LoginService";
import {UserDatabase} from "../userDatabase/UserDatabase";
import bcrypt from "bcrypt";
import {StoredUserData} from "../userDatabase/StoredUserData";

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
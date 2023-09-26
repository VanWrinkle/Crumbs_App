import {IUserLoginService} from "./IUserLoginService";
import {IUserDatabase} from "../IUserDatabase/IUserDatabase";
import bcrypt from "bcrypt";
import {StoredUserData} from "../IUserDatabase/StoredUserData";


export class LoginService implements IUserLoginService {
    #persistence: IUserDatabase;

    constructor(persistence: IUserDatabase) {
        this.#persistence = persistence;
    }

    async retrieveUserData(name: string): Promise<StoredUserData | undefined> {
        return this.#persistence.getUser(name);
    };

    async validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean> {
        return bcrypt.hash(password, userData.salt).then(hash => {
            return (userData.hash === hash)
        })
    }
}
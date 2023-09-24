import {StoredUserData} from "../userDatabase/IUserDatabase";

export interface IUserLoginService {
    retrieveUserData(name: string): Promise<StoredUserData | undefined>;
    validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean>;
}
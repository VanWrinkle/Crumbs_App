import {StoredUserData} from "../userDatabase/StoredUserData";


export interface IUserLoginService {
    retrieveUserData(name: string): Promise<StoredUserData | undefined>;
    validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean>;
}
import {StoredUserData} from "../userDatabase/StoredUserData";

export interface LoginService {
    retrieveUserData(name: string): Promise<StoredUserData | undefined>;
    validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean>;
}
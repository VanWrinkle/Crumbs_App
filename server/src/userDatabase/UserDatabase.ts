import {StoredUserData} from "./StoredUserData";

export interface UserDatabase {
    addUser(user: StoredUserData): Promise<void>
    getUser(username: string): Promise<StoredUserData | undefined>
}



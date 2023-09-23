import {StoredUserData, UserDatabase} from "./userDatabase";

export interface RequestWithDB extends Request {
    db: UserDatabase;
}

export class MockUserDatabase implements UserDatabase {
    users: StoredUserData[];
    constructor() {
        this.users = [];
    }

    addUser(user: StoredUserData): Promise<void> {
        return new Promise((resolve) => {
            this.users.push(user);
            resolve()
        })
    }
    getUser(username: string): Promise<StoredUserData | undefined> {
        return new Promise((resolve) => {
            const user = this.users.find((element) => {
                return element.userName === username
            });
            resolve(user)
        })
    }

}

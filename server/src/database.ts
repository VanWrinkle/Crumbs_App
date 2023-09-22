export interface RequestWithDB extends Request {
    db: Database;
}

interface StoredUserData {
    userName: string,
    hash: string,
    salt: string,
}


export interface Database {
    addUser(user: StoredUserData): Promise<void>
    getUser(username: string): Promise<StoredUserData | undefined>
}

export class MockDatabase implements Database {
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
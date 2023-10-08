import {IUserDatabase} from "./IUserDatabase";
import {StoredUserData} from "./StoredUserData";


export class MockUserDatabase implements IUserDatabase {
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

    deleteUser(username:string): Promise<void> {
        return new Promise((resolve) => {
            this.users = this.users.filter( (user) =>  {return user.userName != username});
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

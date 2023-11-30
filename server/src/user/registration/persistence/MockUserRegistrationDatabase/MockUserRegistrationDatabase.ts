import {ICredentialsPersistence} from "../../../../contracts/ICredentialsPersistence";
import {UserRegistration} from "../../../../entities/UserRegistration";


export class MockUserRegistrationDatabase implements ICredentialsPersistence {
    users: UserRegistration[];
    constructor() {
        this.users = [];
    }

    addUser(user: UserRegistration): Promise<void> {
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
    getUser(username: string): Promise<UserRegistration | undefined> {
        return new Promise((resolve) => {
            const user = this.users.find((element) => {
                return element.userName === username
            });
            resolve(user)
        })
    }

}

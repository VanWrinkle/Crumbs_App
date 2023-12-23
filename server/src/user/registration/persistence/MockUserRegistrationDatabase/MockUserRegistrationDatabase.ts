import {ICredentialsPersistence} from "../../../../contracts/ICredentialsPersistence";
import {UserRegistration} from "../../../../entities/UserRegistration";
import fs from "fs";


export class MockUserRegistrationDatabase implements ICredentialsPersistence {
    users: UserRegistration[] = [];
    constructor() {
        this.load();
    }

    save() {
        fs.writeFileSync("mockUserRegistrationDatabase.json", JSON.stringify(this.users));
    }

    load() {
        try {
            let data = fs.readFileSync("mockUserRegistrationDatabase.json", "utf-8");
            this.users = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }

    addUser(user: UserRegistration): Promise<void> {
        return new Promise((resolve, reject) => {
            if(this.users.find((element) => {return element.userName === user.userName})) {
                reject("User already exists");
            } else  {
                this.users.push(user);
                this.save();
                resolve()
            }
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
            const user = this.users?.find((element) => {
                return element.userName === username
            });
            resolve(user);
        })
    }

}

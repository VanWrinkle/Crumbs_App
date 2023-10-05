import {IUserDatabase} from "../IUserDatabase/IUserDatabase";
import {IUserRegistrationService} from "./IUserRegistrationService"
import bcrypt from "bcrypt";
import {ISocialGraphPersistence} from "../ISocialGraphPersistence/ISocialGraphPersistence";

const usernameRequirements = RegExp("^(?=[a-z_]{4,30}$)");
const passwordRequirements = RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");
const numberOfSaltRounds = 5;

export class RegistrationService implements IUserRegistrationService {
    userPersistence: IUserDatabase;
    graphPersistence: ISocialGraphPersistence;
    constructor (persistence: IUserDatabase, socialGraphPersistence: ISocialGraphPersistence) {
        this.userPersistence = persistence;
        this.graphPersistence = socialGraphPersistence;
    }

    validateCredentialRequirements(username: string, password: string): boolean {
        const legalUsername: boolean = username.match(usernameRequirements) != null;
        const legalPassword: boolean = password.match(passwordRequirements) != null;
        return username !== password && legalUsername && legalPassword
    }

    validateUsernameIsUnique(username: string): Promise<boolean> {
        return new Promise<boolean>(  (resolve) =>  {
            this.userPersistence.getUser(username).then( user => {
                resolve( user != undefined);
            });
        });
    }

    async registerUser(userName: string, password:string): Promise<void> {
        console.log("registering new user");
        return bcrypt
            .genSalt(numberOfSaltRounds)
            .then(salt => {
                return Promise.all([bcrypt.hash(password, salt), salt]);
            })
            .then(([hash, salt]) => {
                this.graphPersistence.createUserNode(userName); //TODO: Any need for synchronization rules?
                return this.userPersistence.addUser({userName, hash, salt});
            })
            .catch( error => {
                console.log("MDBUserRegistrationService failed to register new user");
            })
    }
}
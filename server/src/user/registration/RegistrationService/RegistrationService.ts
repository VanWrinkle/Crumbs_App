import {ICredentialsPersistence} from "../../../contracts/ICredentialsPersistence";
import {IRegistrationService} from "../../../contracts/IRegistrationService"
import bcrypt from "bcrypt";
import {ISocialNetworkPersistence} from "../../../contracts/ISocialNetworkPersistence";

const usernameRequirements = RegExp("^(?=[a-z_]{4,30}$)");
const passwordRequirements = RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");
const numberOfSaltRounds = 5;

export class RegistrationService implements IRegistrationService {
    userPersistence: ICredentialsPersistence;
    graphPersistence: ISocialNetworkPersistence;
    constructor (persistence: ICredentialsPersistence, socialGraphPersistence: ISocialNetworkPersistence) {
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


    deleteUser(username: string): Promise<void> {
        return new Promise<void>(  resolve =>  {
            this.userPersistence.deleteUser(username)
                .then( () => {
                    this.graphPersistence
                        .deleteUserAndCrumbs(username)
                        .then( () => resolve() )
                });
        });
    }

    async registerUser(userName: string, password:string): Promise<void> {
        return bcrypt
            .genSalt(numberOfSaltRounds)
            .then(salt => {
                return Promise.all([bcrypt.hash(password, salt), salt]);
            })
            .then(([hash, salt]) => {
                this.graphPersistence.createUser(userName); //TODO: Any need for synchronization rules?
                return this.userPersistence.addUser({userName, hash, salt});
            })
            .catch( error => {
                console.log("MDBUserRegistrationService failed to register new user");
            })
    }
}
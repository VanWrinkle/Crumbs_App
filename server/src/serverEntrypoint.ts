import fs from 'fs';
import {MDBUserRegistrationDatabase} from "./user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {LoginService} from "./user/login/LoginService/LoginService";
import {RegistrationService} from "./user/registration/RegistrationService/RegistrationService";
import {Application} from "./application/application";
import {ConfigSettings} from "./application/config";
import {AuthenticationService} from "./user/login/authentication/AuthenticationService/AuthenticationService";
import {NeoGraphPersistence} from "./user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";




const userDatabase = new MDBUserRegistrationDatabase();
const socialGraphPersistence = new NeoGraphPersistence();
const sessionManagement = new AuthenticationService('secret-key', 24)

const config: ConfigSettings = {
    registrationService: new RegistrationService(userDatabase, socialGraphPersistence),
    loginService: new LoginService(userDatabase, sessionManagement),
    httpsPrivateKey: fs.readFileSync('private-key.pem', 'utf-8'),
    httpsCertificate: fs.readFileSync('server.crt', 'utf-8'),
}

const app = new Application(config);

app.run();

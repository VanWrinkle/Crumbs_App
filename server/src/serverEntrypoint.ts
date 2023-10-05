import fs from 'fs';
import {MDBUserDatabase} from "./IUserDatabase/MDBUserDatabase";
import {LoginService} from "./IUserLoginService/LoginService";
import {RegistrationService} from "./IUserRegistrationService/RegistrationService";
import {Application} from "./application/application";
import {ConfigSettings} from "./application/config";
import {AuthenticationService} from "./IUserAuthenticationService/AuthenticationService";
import {NeoGraphPersistence} from "./ISocialGraphPersistence/NeoGraphPersistence";




const userDatabase = new MDBUserDatabase();
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

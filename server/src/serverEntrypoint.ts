import fs from 'fs';
import {UserDatabase} from "./IUserDatabase/UserDatabase";
import {LoginService} from "./IUserLoginService/LoginService";
import {RegistrationService} from "./IUserRegistrationService/RegistrationService";
import {Application} from "./application/application";
import {ConfigSettings} from "./application/config";




const userDatabase = new UserDatabase();
const config: ConfigSettings = {
    registrationService: new RegistrationService(userDatabase),
    loginService: new LoginService(userDatabase),
    httpsPrivateKey: fs.readFileSync('private-key.pem', 'utf-8'),
    httpsCertificate: fs.readFileSync('server.crt', 'utf-8'),
}

const app = new Application(config);

app.run();

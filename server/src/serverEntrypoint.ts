import fs from 'fs';
import {MDBUserDatabase} from "./userDatabase/MDBUserDatabase";
import {LoginService} from "./loginService/LoginService";
import {RegistrationService} from "./registrationService/RegistrationService";
import {Application} from "./application/application";
import {ConfigSettings} from "./application/config";




const userDatabase = new MDBUserDatabase();
const config: ConfigSettings = {
    registrationService: new RegistrationService(userDatabase),
    loginService: new LoginService(userDatabase),
    httpsPrivateKey: fs.readFileSync('private-key.pem', 'utf-8'),
    httpsCertificate: fs.readFileSync('server.crt', 'utf-8'),
}

const app = new Application(config);

app.run();

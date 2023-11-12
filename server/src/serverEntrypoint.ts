import fs from 'fs';
import {MDBUserRegistrationDatabase} from "./user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {LoginService} from "./user/login/LoginService/LoginService";
import {RegistrationService} from "./user/registration/RegistrationService/RegistrationService";
import {CrumbServer} from "./server/crumbServer";
import {ConfigSettings} from "./entities/ConfigSettings";
import {AuthenticationService} from "./user/login/authentication/AuthenticationService/AuthenticationService";
import {NeoGraphPersistence} from "./user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";
import {
    httpsCertificate,
    httpsPrivateKey,
    socialGraphPersistence,
    userRegistrationDatabase,
} from "./globals";
import {TestServerConfigs} from "./testUtility/testServerConfig";




const sessionManagement = new AuthenticationService('secret-key', 24)

const config: ConfigSettings = {
    registrationService: new RegistrationService(userRegistrationDatabase, socialGraphPersistence),
    loginService: new LoginService(userRegistrationDatabase, sessionManagement),
    graphPersistence: socialGraphPersistence,
    httpsPrivateKey: httpsPrivateKey,
    httpsCertificate: httpsCertificate,
}

const app = new CrumbServer(config);

app.run();

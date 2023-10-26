import fs from 'fs';
import {MDBUserRegistrationDatabase} from "./user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {LoginService} from "./user/login/LoginService/LoginService";
import {RegistrationService} from "./user/registration/RegistrationService/RegistrationService";
import {Application} from "./application/application";
import {ConfigSettings} from "./entities/ConfigSettings";
import {AuthenticationService} from "./user/login/authentication/AuthenticationService/AuthenticationService";
import {NeoGraphPersistence} from "./user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";




const userRegistrationDatabase =
    new MDBUserRegistrationDatabase(
        "crumbdevs",
        "crumbdevsruler",
        "userdata"
    )

const socialGraphPersistence =
        new NeoGraphPersistence(
            "neo4j://10.212.172.128:7687",
            "neo4j",
            "crumbdevsrule"
        );

const sessionManagement = new AuthenticationService('secret-key', 24)

const config: ConfigSettings = {
    registrationService: new RegistrationService(userRegistrationDatabase, socialGraphPersistence),
    loginService: new LoginService(userRegistrationDatabase, sessionManagement),
    graphPersistence: socialGraphPersistence,
    httpsPrivateKey: fs.readFileSync('./keys/private-key.pem', 'utf-8'),
    httpsCertificate: fs.readFileSync('./keys/server.crt', 'utf-8'),
}

const app = new Application(config);

app.run();

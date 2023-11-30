import {LoginService} from "./user/login/LoginService/LoginService";
import {RegistrationService} from "./user/registration/RegistrationService/RegistrationService";
import {CrumbServer} from "./server/crumbServer";
import {ConfigSettings} from "./entities/ConfigSettings";
import {AuthenticationService} from "./user/login/authentication/AuthenticationService/AuthenticationService";
import {
    httpsCertificate,
    httpsPrivateKey,
    socialGraphPersistence,
    userRegistrationDatabase,
} from "./globals";


let user_db = userRegistrationDatabase();
let graph_db = socialGraphPersistence();

const sessionManagement = new AuthenticationService('secret-key', 24)

const config: ConfigSettings = {
    registrationService: new RegistrationService(user_db, graph_db),
    loginService: new LoginService(user_db, sessionManagement),
    graphPersistence: graph_db,
    httpsPrivateKey: httpsPrivateKey,
    httpsCertificate: httpsCertificate,
}

const app = new CrumbServer(config);

app.run();

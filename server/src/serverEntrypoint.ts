import {LoginService} from "./user/login/LoginService/LoginService";
import {RegistrationService} from "./user/registration/RegistrationService/RegistrationService";
import {ConfigSettings} from "./entities/ConfigSettings";
import {AuthenticationService} from "./user/login/authentication/AuthenticationService/AuthenticationService";
import {config, httpsCertificate, httpsPrivateKey,} from "./globals";
import {CrumbServer} from "./server/crumbServer";
import {
    MockUserRegistrationDatabase
} from "./user/registration/persistence/MockUserRegistrationDatabase/MockUserRegistrationDatabase";
import {MockGraphPersistence} from "./user/content/socialGraph/MockGraphPeristence/MockGraphPersistence";


// let user_db = new MDBUserRegistrationDatabase(
//     config.user_credentials_persistence.usr,
//     config.user_credentials_persistence.pwd,
//     config.user_credentials_persistence.cluster,
//     config.user_credentials_persistence.db
// )
//
// let graph_db = new NeoGraphPersistence(
//     config.user_content_persistence.url,
//     config.user_content_persistence.usr,
//     config.user_content_persistence.pwd
// );

let user_db = new MockUserRegistrationDatabase();
let graph_db = new MockGraphPersistence();

const sessionManagement = new AuthenticationService(
    config.authentication_service.key, 24)

const serverConfig: ConfigSettings = {
    registrationService: new RegistrationService(user_db, graph_db),
    loginService: new LoginService(user_db, sessionManagement),
    graphPersistence: graph_db,
    httpsPrivateKey: httpsPrivateKey,
    httpsCertificate: httpsCertificate,
}



const app = new CrumbServer(serverConfig);

app.run();

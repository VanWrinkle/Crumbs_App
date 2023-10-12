import {IUserRegistrationService} from "../contracts/IUserRegistrationService";
import {IUserLoginService} from "../contracts/IUserLoginService";
import {ISocialGraphPersistence} from "../contracts/ISocialGraphPersistence";

export interface ConfigSettings {
    registrationService: IUserRegistrationService;
    loginService: IUserLoginService;
    graphPersistence: ISocialGraphPersistence;
    httpsPrivateKey: string;
    httpsCertificate: string;
}
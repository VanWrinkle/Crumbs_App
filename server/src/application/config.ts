import {IUserRegistrationService} from "../IUserRegistrationService/IUserRegistrationService";
import {IUserLoginService} from "../IUserLoginService/IUserLoginService";

export interface ConfigSettings {
    registrationService: IUserRegistrationService;
    loginService: IUserLoginService;
    httpsPrivateKey: string;
    httpsCertificate: string;
}
import {IUserRegistrationService} from "../registrationService/IUserRegistrationService";
import {IUserLoginService} from "../loginService/IUserLoginService";

export interface ConfigSettings {
    registrationService: IUserRegistrationService;
    loginService: IUserLoginService;
    httpsPrivateKey: string;
    httpsCertificate: string;
}
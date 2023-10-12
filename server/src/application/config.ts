import {IUserRegistrationService} from "../contracts/IUserRegistrationService";
import {IUserLoginService} from "../contracts/IUserLoginService";

export interface ConfigSettings {
    registrationService: IUserRegistrationService;
    loginService: IUserLoginService;
    httpsPrivateKey: string;
    httpsCertificate: string;
}
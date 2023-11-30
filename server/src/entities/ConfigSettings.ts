import {IRegistrationService} from "../contracts/IRegistrationService";
import {ILoginService} from "../contracts/ILoginService";
import {ISocialNetworkPersistence} from "../contracts/ISocialNetworkPersistence";

export interface ConfigSettings {
    registrationService: IRegistrationService;
    loginService: ILoginService;
    graphPersistence: ISocialNetworkPersistence;
    httpsPrivateKey: string;
    httpsCertificate: string;
}
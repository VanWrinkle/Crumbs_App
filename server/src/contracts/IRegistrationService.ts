export interface IRegistrationService {
    validateCredentialRequirements(username: string, password: string): boolean;
    validateUsernameIsUnique(username: string): Promise<boolean>;
    registerUser(userName: string, password: string): Promise<void>;
    deleteUser(username: string): Promise<void>
}

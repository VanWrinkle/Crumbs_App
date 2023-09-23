export interface UserRegistrationService {
    validateCredentialRequirements(username: string, password: string): boolean;
    validateUniqueUsername(username: string): boolean;
    registerUser(userName: string, hash: string, salt: string): Promise<void>;
}

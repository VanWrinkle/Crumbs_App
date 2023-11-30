import {UserRegistration} from "../entities/UserRegistration";
import express from "express";


export interface ILoginService {
    retrieveUserData(name: string): Promise<UserRegistration | undefined>;
    validateUserCredentials(userData: UserRegistration, password: string): Promise<boolean>;
    sendSessionToken(username: string, response: express.Response): void;
    clearSessionToken(response: express.Response): void;
    tokenParser(): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}
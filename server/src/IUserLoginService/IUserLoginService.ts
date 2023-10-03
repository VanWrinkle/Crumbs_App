import {StoredUserData} from "../IUserDatabase/StoredUserData";
import express from "express";


export interface IUserLoginService {
    retrieveUserData(name: string): Promise<StoredUserData | undefined>;
    validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean>;
    sendSessionToken(username: string, response: express.Response): void;
    clearSessionToken(response: express.Response): void;
    tokenParser(): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}
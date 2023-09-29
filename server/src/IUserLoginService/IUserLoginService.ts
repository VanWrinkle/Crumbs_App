import {StoredUserData} from "../IUserDatabase/StoredUserData";
import express from "express";


export interface IUserLoginService {
    retrieveUserData(name: string): Promise<StoredUserData | undefined>;
    validateUserCredentials(userData: StoredUserData, password: string): Promise<boolean>;
    sendSessionToken(userData: StoredUserData, response: express.Response): void;
    clearSessionToken(response: express.Response): void;
}
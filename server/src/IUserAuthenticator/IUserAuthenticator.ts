import {StoredUserData} from "../IUserDatabase/StoredUserData";
import express from "express";

export interface IUserAuthenticator {
    sendToken(userData: StoredUserData, response: express.Response): void;
    clearSessionToken(response: express.Response): void;
}
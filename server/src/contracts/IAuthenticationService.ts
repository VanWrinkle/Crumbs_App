import express from "express";

export interface IAuthenticationService {
    sendToken(username: string, response: express.Response): void;
    clearSessionToken(response: express.Response): void;
    tokenParser(): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}

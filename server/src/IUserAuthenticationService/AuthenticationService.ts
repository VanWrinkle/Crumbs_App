import {IUserAuthentionService} from "./IUserAuthentionService";
import express from "express";
import jwt from "jsonwebtoken";

export class AuthenticationService implements IUserAuthentionService {
    readonly #secretKey: string;
    readonly #expirationTimeMilliseconds: number;

    constructor(secretKey: string, expirationHours: number) {
        this.#secretKey = secretKey;
        this.#expirationTimeMilliseconds = expirationHours * 60 * 60 * 1000;
    }

    tokenParser() {
        return (req: express.Request, _res: express.Response, next: express.NextFunction) => {
            const token = req.cookies['token'];
            if (token) {
                jwt.verify(token, this.#secretKey, (err: any, decoded: any) => {
                    if (!err) {
                        req.user = decoded.username;
                    }
                    return next();
                });
            }
            return next();
        }
    }

    sendToken(username: string, response: express.Response) {
        const now = new Date()
        const payload = { username: username, ttl: new Date(now.getTime() + this.#expirationTimeMilliseconds) }
        const token = jwt.sign(payload, this.#secretKey, { expiresIn:  this.#expirationTimeMilliseconds})

        response.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: this.#expirationTimeMilliseconds,
            path: '/'
        })
        response.status(200).json(payload)
    }

    clearSessionToken(response: express.Response) {
        response.clearCookie('token', {httpOnly: true, secure: true})
        response.status(200).send('token cleared')
    }

}
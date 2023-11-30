import {IAuthenticationService} from "../../../../contracts/IAuthenticationService";
import express from "express";
import jwt from "jsonwebtoken";

export class AuthenticationService implements IAuthenticationService {
    readonly #secretKey: string;
    readonly #expirationTimeMilliseconds: number;

    constructor(secretKey: string, expirationHours: number) {
        this.#secretKey = secretKey;
        this.#expirationTimeMilliseconds = expirationHours * 60 * 60 * 1000;
    }

    /**
     * tokenParser attempts to verify a token attached to the incoming request as a cookie.
     * If there is no token, or the verification fails, the next middleware is called.
     * If it is present and verifies successfully, user is set on the request.
     */
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
            } else {
                return next();
            }
        }
    }


    /**
     * Sends a JSON web token (JWT) to the client along with some additional data in the response.
     *
     * @param username - The username to include in the token's payload.
     * @param response - The Express response object used to send the token and response data.
     */
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


    /**
     * Clears the session token cookie in the response and sends a confirmation message.
     *
     * @param response - The Express response object used to clear the token cookie and send a response.
     */
    clearSessionToken(response: express.Response) {
        response.clearCookie('token', {httpOnly: true, secure: true})
        response.status(200).send('token cleared')
    }

}
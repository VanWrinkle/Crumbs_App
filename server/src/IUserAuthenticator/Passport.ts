import {IUserAuthenticator} from "./IUserAuthenticator";
import express from "express";
import {StoredUserData} from "../IUserDatabase/StoredUserData";
import jwt from "jsonwebtoken";
import passport from "passport";
import {Strategy} from 'passport-jwt'

export class Passport implements IUserAuthenticator {
    readonly #secretKey: string;
    readonly #expirationTimeMilliseconds: number;

    constructor(secretKey: string, expirationHours: number) {
        this.#secretKey = secretKey;
        this.#expirationTimeMilliseconds = expirationHours * 60 * 60 * 1000;

        passport.use(new Strategy({
            jwtFromRequest: (req: express.Request) => {
                return req && req.cookies ? req.cookies['token'] : null
            },
            secretOrKey: this.#secretKey
        }, (payload: any, done: any) => {
            done(null, payload.username)
        }))
    }


    sendToken(userData: StoredUserData, response: express.Response) {
        const now = new Date()
        const payload = { username: userData.userName, ttl: new Date(now.getTime() + this.#expirationTimeMilliseconds) }
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
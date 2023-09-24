import express from "express";
import path from "path";
import {reactDir} from "./globals";
import jwt from 'jsonwebtoken'
import {IUserLoginService} from "./loginService/IUserLoginService";
import {IUserRegistrationService} from "./registrationService/IUserRegistrationService";


export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(registrationService: IUserRegistrationService) {
    return async function(req: express.Request, res: express.Response) {
        const {username, password} = req.body as any;

        switch (true) {
            case !username || !password: {
                res.status(400)
                    .send('required fields "username" or "password" missing');
            } break;

            case !registrationService.validateCredentialRequirements(username, password): {
                res.status(400)
                    .send('username or password does not meet complexity requirements');
            } break;

            case await registrationService.validateUsernameIsUnique(username): {
                res.status(409).send('username already exists')
            } break;

            default: {
                registrationService
                    .registerUser(username, password)
                    .then( () => {
                        res.status(201).send('user created');
                    })
                    .catch( error => {
                        res.status(500).send('failed to create new user');
                    });
            } break;
        }
    }
}


export function loginUser(loginService: IUserLoginService) {
    return async function loginUser(req: express.Request, res: express.Response) {
        const {username, password} = req.body as any;
        if (!username || !password) {
            res.status(400).send('required fields "username" or "password" missing');
            return
        }

        loginService.retrieveUserData(username)
            .then(userData => {
                if (!userData) {
                    res.status(401).send('invalid username or password');
                } else {
                    loginService.validateUserCredentials(userData, password)
                        .then( credentialsMatch => {
                            if (credentialsMatch) {
                                const payload = { username: userData.userName }
                                // TODO: change secret key and store securely
                                const token = jwt.sign(payload, 'secret-key', { expiresIn: '7d' })
                                res.status(200).json({ token });
                            } else {
                                res.status(401).send('invalid username or password');
                            }
                        })
                        .catch(err => {
                            console.log(err); // hashing function failed
                            res.status(500).send('internal server error');
                        });
                }
            })
            .catch(() => {
                res.status(504).send('userDatabase connection failed');
            })
    }
}



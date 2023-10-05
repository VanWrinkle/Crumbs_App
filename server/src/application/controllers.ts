import express from "express";
import path from "path";
import {reactDir} from "../globals";
import {IUserLoginService} from "../IUserLoginService/IUserLoginService";
import {IUserRegistrationService} from "../IUserRegistrationService/IUserRegistrationService";
import {ISocialGraphPersistence} from "../ISocialGraphPersistence/ISocialGraphPersistence";
import {CrumbParser} from "../CrumbParser/CrumbParser";


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
                    .catch( () => {
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
                                loginService.sendSessionToken(username, res)
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
                res.status(504).send('IUserDatabase connection failed');
            })
    }
}


export function logoutUser(loginService: IUserLoginService) {
    return function (req: express.Request, res: express.Response) {
        loginService.clearSessionToken(res)
    }
}

export function renewUserToken(loginService: IUserLoginService) {
    return function renewUserToken(req: express.Request, res: express.Response) {
        if (req.user) {
            loginService.sendSessionToken(req.user.toString(), res)
        } else {
            res.status(401).send()
        }

    }
}


export function postCrumb(persistence: ISocialGraphPersistence) {
    return function(req: express.Request, res: express.Response) {
        if (req.user) {
            let username = req.user.toString()
            let parsedCrumb = CrumbParser.parseCrumb(req.body.content)
            persistence
                .createCrumb(null, username, parsedCrumb)
                .catch( () => res.status(500).send() )
                .then(  () => res.status(201).send() )
        } else {
            console.log("unauthenticated user")
            res.status(401).send()
        }
    }
}
import express, {NextFunction} from "express";
import path from "path";
import {reactDir} from "../globals";
import {ILoginService} from "../contracts/ILoginService";
import {IRegistrationService} from "../contracts/IRegistrationService";
import {ISocialNetworkPersistence} from "../contracts/ISocialNetworkPersistence";
import {CrumbFilter} from "../entities/CrumbFilter";
import {Crumb} from "../entities/Crumb";
import {DBErrors} from "../logging/errors";

function withTimeout(promise: any, timeout: number = 1000) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Promise timed out')), timeout)
        )
    ]);
}


export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(registrationService: IRegistrationService) {
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


export function loginUser(loginService: ILoginService) {
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
                            res.status(500).send('internal server error');
                        });
                }
            })
            .catch(() => {
                res.status(504).send('IUserDatabase connection failed');
            })
    }
}


export function logoutUser(loginService: ILoginService) {
    return function (req: express.Request, res: express.Response) {
        loginService.clearSessionToken(res)
    }
}

export function renewUserToken(loginService: ILoginService) {
    return function renewUserToken(req: express.Request, res: express.Response) {
        if (req.user) {
            loginService.sendSessionToken(req.user.toString(), res)
        } else {
            res.status(401).send()
        }
    }
}


export function postCrumb(persistence: ISocialNetworkPersistence) {
    return function(req: express.Request, res: express.Response) {
        if (req.user) {
            let username = req.user.toString()
            let parsedCrumb = Crumb.parseContentsFromString(req.body.content)
            persistence
                .createCrumb(
                    // req.body.parent ? req.body.parent.toString() : null,
                    req.body.parent?.toString() ?? null,
                    username,
                    parsedCrumb)
                .catch( () => res.status(500).send() )
                .then(  () => res.status(201).send() )
        } else {
            res.status(401).send()
        }
    }
}



export function setFollow(persistence: ISocialNetworkPersistence, follows: boolean) {
    return function(req: express.Request, res: express.Response) {
        if(req.user) {
            let id = req.query.user?.toString()
            if (id) {
                persistence.setUserFollowing(req.user.toString(), id, follows)
                    .catch(()=> {
                        res.status(500).send() // TODO: Logic for not found
                    })
                    .then( () => {
                        res.status(201).send()
                    })
            } else {
                res.status(400).send()
            }
        } else {
            res.status(401).send()
        }
    }
}

export function setLike(persistence: ISocialNetworkPersistence, likes: boolean) {
    return function(req: express.Request, res: express.Response) {
        if(req.user) {
            let id = req.query.crumb?.toString()
            if (id) {
                persistence.setCrumbLiked(req.user.toString(), id, likes)
                    .catch(() => {
                        res.status(500).send()
                    })
                    .then(() => {
                        res.status(201).send()
                    })
            } else {
                res.status(400).send()
            }
        } else {
            res.status(401).send()
        }
    }
}



export function getMainFeed(persistence: ISocialNetworkPersistence) {
    return function(req: express.Request, res: express.Response) {
        let filter = new CrumbFilter();

        filter.sort = CrumbFilter.Sort.Time;
        filter.max =  Number.parseInt(req.query?.max_posts?.toString() ?? "") || filter.max;
        filter.parent_post = req.query.parent?.toString() ?? undefined;
        filter.filter_out_own = req.query.filter_out_own?.toString() === "true";

        persistence
            .getCrumbs(
                req.user?.toString() ?? null,
                filter,
                req.query.continue_from?.toString() ?? null,
            )
            .then( crumbs => {
                    res.status(200).send(crumbs);
                })
            .catch( error => {
                switch(error) {
                    case DBErrors.CONNECTION_ERROR:
                        res.status(504).send();
                        break;
                    default:
                        res.status(500).send();
                        break;
                }
            } )
    }
}

/**
 * Handler should fetch in bulk the most recent posts by a specific user
 * requested in by queries. Accepted queries:
 *    "user": string
 *    "max_posts": number
 *    "continue_from": string
 * Should be requestable by anyone, including anonymously
 * @param persistence
 * @return - same output format as main feed
 */
export function getUserFeed(persistence: ISocialNetworkPersistence) {
    return function(req: express.Request, res: express.Response) {

        if(req.query.user) {
            let filter = new CrumbFilter();
            filter.max = Number.parseInt(req.query?.max_posts?.toString() ?? "") || filter.max;
            filter.authors = [req.query.user.toString()]
            const continue_from = req.query.continue_from?.toString() ?? null
            persistence
                .getCrumbs(null, filter, continue_from)
                .then( crumbs => {
                        res.status(200).send(crumbs);
                    })
                .catch( _ => res.status(500).send())
        } else {
            res.status(404).send();
        }
    }
}


/**
 * Handler should delete the authenticated, all data associated with the user,
 * and finally clear the access token
 */
export function deleteUser(userRegistration: IRegistrationService, loginService: ILoginService) {
    return function(req: express.Request, res: express.Response) {
        if (req.user) {
            userRegistration.deleteUser(req.user.toString())
                .then( () => {
                    loginService.clearSessionToken(res)
                })
                .catch( _ => {
                    res.status(500).send();
                })
        } else {
            res.status(401).send("Access forbidden");
        }
    }
}


/**
 *
 */
export function getReplies(persistence: ISocialNetworkPersistence) {
    return function(req: express.Request, res: express.Response) {
        let filter = new CrumbFilter();
        filter.parent_post = req.body.parent;
        persistence.getCrumbs(req.user? req.user.toString() : null, filter, req.body.continue_from)
            .then( crumbs => {
                res.status(200).send(crumbs);
            })
            .catch( _ => {
                res.status(500).send();
            })
    }
}




export function getProfileInfo(persistence: ISocialNetworkPersistence) {
    return function(req: express.Request, res: express.Response) {
        if(req.query.profileOwner) {
            persistence
                .getProfileInfo(
                    req.user? req.user.toString() : null,
                    req.query.profileOwner.toString(),
                    )
                .then( result => { //TODO 403 for not found
                        res.status(200).send( result )
                })
                .catch( error =>  {
                    res.status(500).send()
                })
        } else {
            res.status(400).send()
        }
    }
}

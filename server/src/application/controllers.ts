import express, {query} from "express";
import path from "path";
import {reactDir} from "../globals";
import {IUserLoginService} from "../IUserLoginService/IUserLoginService";
import {IUserRegistrationService} from "../IUserRegistrationService/IUserRegistrationService";
import {ISocialGraphPersistence} from "../ISocialGraphPersistence/ISocialGraphPersistence";
import {CrumbParser} from "../CrumbParser/CrumbParser";
import {CrumbFilter} from "../ISocialGraphPersistence/NeoGraphPersistence/NeoGraphPersistence";
import {Sort} from "../IPostPresentationService/IPostPresentationService";


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
                .createCrumb(req.body!.parent, username, parsedCrumb)
                .catch( () => res.status(500).send() )
                .then(  () => res.status(201).send() )
        } else {
            console.log("unauthenticated user")
            res.status(401).send()
        }
    }
}



export function setFollow(persistence: ISocialGraphPersistence, follows: boolean) {
    return function(req: express.Request, res: express.Response) {
        if(req.user) {
            persistence.setCrumbLiked(req.user.toString(), req.body.user, follows)
                .catch(()=> {
                    res.status(500).send() // TODO: Logic for not found
                })
                .then( () => {
                    res.status(201).send()
                })
        } else {
            res.status(401).send()
        }
    }
}

export function setLike(persistence: ISocialGraphPersistence, likes: boolean) {
    return function(req: express.Request, res: express.Response) {
        if(req.user) {
            let id = req.query.crumb?.toString()
            if (id) {
                persistence.setCrumbLiked(req.user.toString(), id, likes)
                    .catch(() => {
                        res.status(500).send() // TODO: Logic for not found
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

export function getMainFeed(persistence: ISocialGraphPersistence) {
    return function(req: express.Request, res: express.Response) {
        let filter = new CrumbFilter();
        filter.sort = Sort.Time;

        if(req.query.max_posts) {
            let max = Number.parseInt(req.query.max_posts.toString());
            console.log(req.query.max_posts)
            if (!isNaN(max)) {
                filter.max = Math.min(max, 100); //TODO: Use setters in CrumbFilter class for enforcing of rules
            }
        }

        persistence.getCrumbs(
            ((req.user != undefined)? req.user.toString() : null),
            filter,
            ((req.query.continue_from && (req.query.continue_from.toString() != ""))? req.query.continue_from.toString() : null),
        )
            .catch( () => res.status(500).send() )
            .then( crumbs => {
                    res.status(200).send(crumbs);
                })
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
export function getUserFeed(persistence: ISocialGraphPersistence) {
    return function(req: express.Request, res: express.Response) {
        if(req.body.user) {
            let filter = new CrumbFilter();
            filter.max = req.body.max_posts;
            persistence
                .getCrumbs(null, filter, req.body.continue_from)
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
export function deleteUser(userRegistration: IUserRegistrationService) {
    return function(req: express.Request, res: express.Response) {
        console.log("deleteUser: " + req.user)
        if (req.user) {
            userRegistration.deleteUser(req.user.toString())
                .then( () => {
                    res.status(204).send();
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
 * example request body
 * {
 *   "parent": "130123",
 *   "max_posts": 15,
 *   "continue_from": "1234"
 * }
 */
export function getReplies(persistence: ISocialGraphPersistence) {
    return function(req: express.Request, res: express.Response) {
        let filter = new CrumbFilter();
        filter.parent_post = req.body.parent;
        persistence.getCrumbs(req.user? req.user.toString():null, filter, req.body.continue_from)
            .then( crumbs => {
                res.status(200).send(crumbs);
            })
            .catch( _ => {
                res.status(500).send();
            })
    }
}

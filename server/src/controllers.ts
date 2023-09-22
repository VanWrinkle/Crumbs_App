import express from "express";
import path from "path";
import bcrypt from 'bcrypt';
import {numberOfSaltRounds, reactDir} from "./config";
import {meetsCredentialRequirements} from "./utils";
import {Database} from "./database";


export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(database: Database) {
    return async function(req: express.Request, res: express.Response) {
        const {userName, userPass} = req.body as any;
        if (!userName || !userPass) {
            res.status(400).send('required fields "userName" or "userPass" missing');
        } else if (!meetsCredentialRequirements(userName, userPass)) {
            res.status(400).send('username or password does not meet complexity requirements')
        } else if (await database.getUser(userName)) {
            res.status(409).send('username already exists')
        } else {
            bcrypt
                .genSalt(numberOfSaltRounds)
                .then(salt => { return bcrypt.hash(userPass, salt) })
                .then(hash => {
                    database.addUser({userName: userName, userPass: hash})
                        .then(() => { res.status(201).send('user created') })
                        .catch(() => { res.status(504).send('database connection failed') })
                })
                .catch(err => {
                    console.log(err); // hashing function failed
                    res.status(500).send('internal server error');
                })
        }
    }
}


export function loginUser(database: Database) {
    return async function loginUser(req: express.Request, res: express.Response) {
        res.status(501).send('login not implemented yet');
    }
}



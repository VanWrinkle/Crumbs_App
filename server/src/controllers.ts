import express from "express";
import path from "path";
import bcrypt from 'bcrypt';
import {numberOfSaltRounds, reactDir} from "./config";
import {meetsCredentialRequirements} from "./utils";
import {Database} from "./database";
import jwt from 'jsonwebtoken'


export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(database: Database) {
    return async function(req: express.Request, res: express.Response) {
        const {username, password} = req.body as any;
        if (!username || !password) {
            res.status(400).send('required fields "username" or "password" missing');
        } else if (!meetsCredentialRequirements(username, password)) {
            res.status(400).send('username or password does not meet complexity requirements')
        } else if (await database.getUser(username)) {
            res.status(409).send('username already exists')
        } else {
            bcrypt
                .genSalt(numberOfSaltRounds)
                .then(salt => {
                    return Promise.all([bcrypt.hash(password, salt), salt])
                })
                .then(([hash, salt]) => {
                    return database.addUser({userName: username, hash: hash, salt: salt})
                })
                .then(() => {
                    res.status(201).send('user created')
                })
                .catch(() => {
                    res.status(504).send('database connection failed')
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
        const {username, password} = req.body as any;
        if (!username || !password) {
            res.status(400).send('required fields "username" or "password" missing');
            return
        }

        await database.getUser(username)
            .then(userData => {
                if (!userData) {
                    res.status(401).send('invalid username or password');
                } else {
                    bcrypt
                        .hash(password, userData.salt)
                        .then(hash => {
                            if (userData.hash != hash) {
                                res.status(401).send('invalid username or password');
                            } else {
                                const payload = { username: userData.userName }
                                // TODO: change secret key and store securely
                                const token = jwt.sign(payload, 'secret-key', { expiresIn: '7d' })
                                res.status(200).json({ token });
                            }
                        })
                        .catch(err => {
                            console.log(err); // hashing function failed
                            res.status(500).send('internal server error');
                        });
                }
            })
            .catch(() => {
                res.status(504).send('database connection failed');
            })
    }
}


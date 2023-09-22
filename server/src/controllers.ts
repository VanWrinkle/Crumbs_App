import express from "express";
import path from "path";
import {reactDir} from "./config";
import {meetsCredentialRequirements} from "./utils";

export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(req: express.Request, res: express.Response) {
    const { userName, userPass } = req.body;

    if (!userName || !userPass) {
        res.status(400).send('required fields "userName" or "userPass" missing');
    } else if (!meetsCredentialRequirements(userName, userPass)) {
        res.status(400).send('username or password does not meet complexity requirements')
    } else if (false) {
        // TODO
        res.status(409).send('username already exists')
    } else {
        res.status(201).send('user created')
    }
}

export function loginUser(req: express.Request, res: express.Response) {
    res.status(501).send('login not implemented yet');
}



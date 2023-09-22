import express from "express";
import path from "path";
import {reactDir} from "./config";

export function reactApp(req: express.Request, res: express.Response) {
    res.sendFile(path.join(reactDir, 'index.html'));
}

export function registerUser(req: express.Request, res: express.Response) {
    res.send('register');
}

export function loginUser(req: express.Request, res: express.Response) {
    res.send('register');
}

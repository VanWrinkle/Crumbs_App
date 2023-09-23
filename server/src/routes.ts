import express from 'express';
import {reactDir} from "./config";
import {requireHTTPS} from "./middleware";
import {loginUser, reactApp, registerUser} from "./controllers";
import {UserDatabase} from "./userDatabase/userDatabase";

function routerDefinitions(database: UserDatabase): express.Router {
    return express.Router()
        .use(requireHTTPS)
        .use(express.static(reactDir))
        .use(express.json())
        // .use(attachDatabase(database) as any)
        .get('/', reactApp)
        .post('/register', registerUser(database))
        .post('/login', loginUser(database));
}

module.exports = routerDefinitions;
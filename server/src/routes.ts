import express, {Router} from 'express';
import {reactDir} from "./config";
import {requireHTTPS} from "./middleware";
import {loginUser, reactApp, registerUser} from "./controllers";
import {UserDatabase} from "./userDatabase/UserDatabase";

/**
 * defines middleware and controllers for express
 */
function routerDefinitions(database: UserDatabase): Router {
    return express.Router()
        .use(requireHTTPS)                          // redirect http GET to https
        .use(express.static(reactDir))              // static files for react
        .use(express.json())                        // parser
        .get('/', reactApp)                         // react index.html
        .post('/register', registerUser(database))
        .post('/login', loginUser(database));
}

module.exports = routerDefinitions;
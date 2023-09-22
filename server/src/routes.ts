import express from 'express';
import {reactDir} from "./config";
import {requireHTTPS} from "./middleware";
import {loginUser, reactApp, registerUser} from "./controllers";
const router = express.Router();

router
    .use(requireHTTPS)
    .use(express.static(reactDir))
    .use(express.json())
    .get('/', reactApp)
    .post('/register', registerUser)
    .post('/login', loginUser);

module.exports = router;
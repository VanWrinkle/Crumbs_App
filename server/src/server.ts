import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';

// replace MongoDBService with this if not available
// import {MockDatabase} from "./userDatabase/userDatabase";
import {MongoUserDatabase} from "./userDatabase/mongoUserDatabase";
import {MockUserDatabase} from "./userDatabase/mockUserDatabase";
//import {MDBLoginService} from "./loginService/MDBLoginService";

const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const certificate = fs.readFileSync('server.crt', 'utf-8');

const app = express();

app.use('/', require('./routes')(new MongoUserDatabase()));

http.createServer(app).listen(80);
https.createServer({key: privateKey, cert: certificate}, app).listen(443, () => {
    console.log(`Server running at https://localhost`);
});


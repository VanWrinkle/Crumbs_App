import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';

// replace MongoDBService with this if not available
// import {MockDatabase} from "./userDatabase/userDatabase";
import {MongoUserDatabase} from "./userDatabase/MongoUserDatabase";
import {MockUserDatabase} from "./userDatabase/MockUserDatabase";
//import {MDBLoginService} from "./loginService/MDBLoginService";


const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const certificate = fs.readFileSync('server.crt', 'utf-8');

const app = express();

// add routes
app.use('/', require('./routes')(new MongoUserDatabase()));

// HTTP is only used for GET redirects to HTTPS
http.createServer(app).listen(80);
https.createServer({key: privateKey, cert: certificate}, app).listen(443, () => {
    console.log(`Server running at https://localhost`);
});


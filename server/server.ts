import express, { Request, Response } from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';

const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const certificate = fs.readFileSync('server.crt', 'utf-8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = 443;
const httpsServer = https.createServer(credentials, app).listen(port);
const reactDir = path.join(__dirname, '..', 'client')

app.use(express.static(path.join(reactDir, 'build')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(reactDir, '/build', 'index.html'))
});

console.log(`Server running at https://localhost:${port}`);
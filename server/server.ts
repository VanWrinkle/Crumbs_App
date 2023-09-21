import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import http from "http";

function requireHTTPS(req: Request, res: Response, next: NextFunction) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const certificate = fs.readFileSync('server.crt', 'utf-8');

const app = express();
const port = 443;
const reactDir = path.join(__dirname, '..', 'client')


app.use(requireHTTPS);
app.use(express.static(path.join(reactDir, 'build')));

app.get('/', (res: Response) => {
    res.sendFile(path.join(reactDir, '/build', 'index.html'))
});

http.createServer(app).listen(80);
https.createServer({key: privateKey, cert: certificate}, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});


import express from "express";
import {Database, RequestWithDB} from "./database";

export function requireHTTPS(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

// export function attachDatabase(database: Database) {
//     return function(req: RequestWithDB, res: express.Response, next: express.NextFunction) {
//         req.db = database;
//         next();
//     }
// }
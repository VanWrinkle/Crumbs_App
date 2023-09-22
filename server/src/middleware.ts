import express from "express";

export function requireHTTPS(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

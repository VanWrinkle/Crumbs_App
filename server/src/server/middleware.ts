import {Request, Response, NextFunction} from "express";

/**
 * Redirects any http GET requests to HTTPS
 * @param req
 * @param res
 * @param next - next middleware, equivalent to return in the middleware chain
 */
export function requireHTTPS(req: Request, res: Response, next: NextFunction) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}


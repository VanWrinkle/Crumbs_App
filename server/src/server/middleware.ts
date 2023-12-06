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


/**
 * Middleware that logs the request body and status code
 *
 * @param req - request object
 * @param res - response object
 * @param next - next middleware, equivalent to return in the middleware chain
 */
export function responseLogger(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);
    res.send = (body) => {
        console.log("request url:", req.url);
        console.log("request body:", req.body);
        console.log('Status Code:', res.statusCode);
        console.log('Response Body:', body);
        return originalSend(body);
    };
    next();
}

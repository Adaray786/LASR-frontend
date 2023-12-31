import { NextFunction, Request, Response } from "express";

export const auth = function (req: Request, res:Response, next:Function)
{
    if(req.session.token && req.session.token.length > 0){
        next()
    }
    else{
        res.redirect('/login')
    }
}
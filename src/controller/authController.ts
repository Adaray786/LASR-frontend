import {Request, Response, Application, response} from "express";
import { Login } from "../model/auth";
const authService = require("../service/authService");

export const authController = (app: Application) =>
{
    app.get('/login', async (req:Request, res:Response) => {
        res.render("login")
    })
    app.post('/login', async (req:Request, res:Response) => {
        let data: Login = req.body;

        try{
            req.session.token = await authService.login(data)
            res.redirect('/products') // front page url
        }
        catch(e){
            console.error(e)
            res.locals.errormessage = (e as Error).message
            res.render('login', req.body)
        }

    })
}
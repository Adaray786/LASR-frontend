import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import type { SalesEmployee } from './model/salesEmployee';
import session from "express-session";
import { authController } from './controller/authController';
const app = express();
import session = require("express-session");
import { salesEmployeeController } from "./controller/salesEmployeeController";
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret : "Not hardcoded", cookie: {maxAge:6000}}));
declare module "express-session"{
    interface SessionData{
        salesEmployee: SalesEmployee
        token: string
    }
}

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret: "Not a verty secret secret", cookie: {maxAge:6000}}));
declare module "express-session"{
    interface SessionData{
        token: string
    }
}
app.listen(3000, ()=> {
    console.log("Server listening on port 3000");
});
salesEmployeeController(app)
// const authMiddleware = require("./middleware/auth")
// app.use(authMiddleware); // this needs to be put always on top of the other require controllers.
authController(app);
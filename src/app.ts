import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import session from "express-session";
import { authController } from './controller/authController';
const app = express();

const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

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
// const authMiddleware = require("./middleware/auth")
// app.use(authMiddleware); // this needs to be put always on top of the other require controllers.
authController(app);
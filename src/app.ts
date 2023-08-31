import express from 'express';
import nunjucks from 'nunjucks';
import session from 'express-session';
import path from 'path';
import { DeliveryEmployee } from './model/deliveryEmployee';
import exp from 'constants';
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

app.use(express.json())

app.use(express.urlencoded({extended: true}));

app.use(session({secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}));

declare module "express-session" {
    interface SessionData {
        deliveryEmployee: DeliveryEmployee;
        token: string;
    }
}

app.listen(3000, ()=> {
    console.log("Server listening on port 3000");
});


require('./controller/deliveryEmployeeController')(app);
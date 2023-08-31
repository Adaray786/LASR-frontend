import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
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

app.listen(3000, ()=> {
    console.log("Server listening on port 3000");
});
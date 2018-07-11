const myexpress = require('express');
const app = myexpress();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const myrout = require('./router/myroutes.js');
console.log(__dirname);
app.use(logger('dev'));
app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(session({
    secret:'123456',
    name:'user',
    cookie:{maxAge:80000},
    rolling:true,
    resave:true
}));
app.use(myexpress.static(__dirname + '/public'));
app.use(myrout);
app.listen(7890);
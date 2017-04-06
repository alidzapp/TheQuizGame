const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    validator = require('express-validator'),
    session = require('express-session'),
    hbs = require('hbs');

const app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'titkos szoveg',
    resave: false,
    saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(validator());
app.use(flash());

const authentication = require('./modules/authentication');
app.use(authentication);

const router = require('./routes') 
app.use(router);



module.exports = app;

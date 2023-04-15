//File Name: app.js, Student Name: Aqeish Parvez, Student ID: 301225795, Date: February 4th, 2023

// const http = require('http');

// http.createServer(
//     (req, res) => {
//          res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('<h2>Hello World</h2>');
//         }
//     ).listen(3000);

// // function myServerHandler(request, response){
// //     response.writeHead(200, {'Content-Type': 'text/html'});
// //     response.end('<h1>Hello World</h1>');
// // }

// console.log('Server running at http://localhost:3000');

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';


//ES2022 Modules fix for __dirname
import path, {dirname} from 'path';
import {fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

//Auth step 1 - import passport modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Auth step 2 - define auth strategy
let localStrategy = passportLocal.Strategy;

import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Auth Step 3 - import the user model
import User from './models/user.js';

// Import Monguse module
import mongoose from 'mongoose';

//Configuration Module
import { Secret, MongoURI } from '../config/index.js';

//Import Routes
import indexRouter from '../app/routes/index.js';
import moviesRouter from '../app/routes/movies.js';
import surveyRouter from '../app/routes/survey.js';
import businessContactsRouter from '../app/routes/businesscontacts.js';
import authRouter from '../app/routes/auth.js';

//Import API Routes
import authAPIRouter from '../app/routes/api/auth-api.js';
import moviesApiRouter from '../app/routes/api/movies-api.js';
import surveysApiRouter from '../app/routes/api/survey-api.js';

//Complete database configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Database Listeners
db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.log("Mongo Connection Error"));

//Instantiate the express application
const app = express();

//Setup Express Middlewares


//EJS Setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//General Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors()); //to be used with Angular

//Auth step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}))

//Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Auth step 5 - Setup Flash
app.use(flash());

//Auth step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

//Auth step 7 - Implementing authorization stratgey
passport.use(User.createStrategy());

//Auth step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Auth step 9 - Enable JWT
let jwtOption = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}

//JWT Passport Strategy
let strategy = new JWTStrategy(jwtOption, (jwt_payLoad, done) => {
    User.findById(jwt_payLoad.id)
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err, false);
        });
})

passport.use(strategy);

//Use Routes
app.use('/', indexRouter);
app.use('/', moviesRouter);
app.use('/', businessContactsRouter);
app.use('/', surveyRouter);
app.use('/', authRouter);

//Enable API Routes
app.use('/api/auth', authAPIRouter);
app.use('/api/movies', passport.authenticate('jwt', {success: false}), moviesApiRouter);
app.use('/api/surveys', passport.authenticate('jwt', {success: false}), surveysApiRouter);

export default app;
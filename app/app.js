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
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';


//ES2022 Modules fix for __dirname
import path, {dirname} from 'path';
import {fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuration Module
import { Secret } from '../config/index.js';

//Import Routes
import indexRouter from '../app/routes/index.js';


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
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}))



//Use Routes
app.use('/', indexRouter);
app.use('/', indexRouter);



export default app;
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
const app = express();

//logger middleware

function logger(req, res, next){
    console.log(req.method, req.url);
    next();
}

function goodbyeWorld(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.end('Goodbye World');
}

function helloWorld(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello World');
}

app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

export default app;
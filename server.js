const http = require('http');

http.createServer(
    (req, res) => {
         res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h2>Hello World</h2>');
        }
    ).listen(3000);

// function myServerHandler(request, response){
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end('<h1>Hello World</h1>');
// }

console.log('Server running at http://localhost:3000');
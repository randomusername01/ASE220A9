const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

let credentials = {};

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Error: File not found");
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const userData = JSON.parse(body);
            const { email, password } = userData;
            const responseJson = { message: "Operation failed", status: 500 };

            if (req.url === '/api/signup') {
                if (credentials[email]) {
                    responseJson.message = "Signup failed: User already exists";
                    responseJson.status = 401;
                } else {
                    credentials[email] = password;
                    responseJson.message = "Signup successful";
                    responseJson.status = 200;
                }
            } else if (req.url === '/api/signin') {
                if (credentials[email] && credentials[email] === password) {
                    responseJson.message = "Signin successful";
                    responseJson.status = 200;
                } else {
                    responseJson.message = "Signin failed: Invalid credentials";
                    responseJson.status = 403;
                }
            }

            res.writeHead(responseJson.status, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseJson));
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

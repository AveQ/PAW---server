const https = require('https');
const app = require('./app');
const fs = require('fs');
const port = process.env.PORT || 3001;

const options = {
    key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
};

const server = https.createServer(options, app);

server.listen(port);

"use strict";
exports.__esModule = true;
var http = require("http");
var server_1 = require("./server");
var PORT = normalizePort(process.env.PORT || 8080);
server_1["default"].set('port', PORT);
console.log("Server listening on port " + PORT);
console.log("Running in " + process.env.NODE_ENV + " mode");
var server = http.createServer(server_1["default"]);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? "pipe " + addr : "port " + addr.port;
}

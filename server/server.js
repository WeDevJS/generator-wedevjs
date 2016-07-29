// Load the http module to create an http server.
var http = require('http');
var config = require('../config/gulp.config');
var path = require('path');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'), { title: 'Hey', message: 'Hello there!'});
});

app.listen(config.serverPort, function () {
  console.log('app listening on port 3000!');
});

// Put a friendly message on the terminal
console.log("Server running at " + config.serverAddress + config.serverPort);
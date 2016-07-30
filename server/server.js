// Load the http module to create an http server.
var http = require('http');
var config = require('../config/gulp.config');
var path = require('path');
var db = require('./db/connect');

var express = require('express');
var app = express();

app.use("/css", express.static(__dirname + '/../dist/css'));
app.use("/js", express.static(__dirname + '/../dist/js'));

console.log(path.resolve(__dirname + '/../dist/js'));

app.get('/', function (req, res) {
	console.log("Got hit on /");
    res.setHeader('Content-Type', 'text/html; charset=utf-8');	
	res.sendFile(path.resolve('dist/index.html'));
});

app.get('/api/form', function (req, res) {
    res.setHeader('Content-Type', 'application/json');	
    db.receiveAllData(function(result){
		res.send(result);
		res.end();
	});
});

app.listen(config.serverPort, function () {
  console.log('app listening on port ' + config.serverPort);
});

// Put a friendly message on the terminal
console.log("Server running at " + config.serverAddress + config.serverPort);


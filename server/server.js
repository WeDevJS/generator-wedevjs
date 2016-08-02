// Load the http module to create an http server.
var http = require('http');
var config = require('../config/gulp.config');
var path = require('path');
var db = require('./db/connect');

var express = require('express');
var app = express();

app.use(express.static(path.resolve(__dirname + '/../' + config.dist.base)));

console.log(path.resolve(__dirname + '/../' + config.dist.css));

app.get('/', function (req, res) {
	console.log("Got hit on /");
    res.setHeader('Content-Type', 'text/html; charset=utf-8');	
	res.sendFile(path.resolve(config.dist.base+'index.html'));
});

app.get('/api/form', function (req, res) {
    res.setHeader('Content-Type', 'application/json');	
    db.receiveAllData(function(result){
		res.send(result);
		res.end();
	});
});

app.listen(config.server.port, function () {
  console.log('app listening on port ' + config.server.port);
 

});

// Put a friendly message on the terminal
console.log("Server running at " + config.server.address + config.server.port);


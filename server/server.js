// Load the http module to create an http server.
var http = require('http');
var config = require('../config/gulp.config');
var path = require('path');
var db = require('./db/connect');

var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.use(express.static(path.resolve(__dirname + '/../' + config.client.base)));
app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

app.get('/', function (req, res) {
	console.log("Got hit on /");
    res.setHeader('Content-Type', 'text/html; charset=utf-8');	
	res.render(path.resolve(config.client.views + 'index.jade'));
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


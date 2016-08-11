// Load the http module to create an http server.
var http = require('http'),
	config = require('../config/gulp.config'),
	path = require('path'),
	db = require('./db/connect'),
	express = require('express'),
	app = express();

app.set('view engine', 'pug');


app.use('/assets',express.static(path.resolve(__dirname + '/../' + config.dist.base)));
app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

app.get('/', function (req, res) {
	res.render(path.resolve(config.client.views + 'layout.jade'));
});

app.get('/*', function (req, res) {
	res.render(path.resolve(config.client.views + 'layout.jade'));
});

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render(config.client.partialViews + name);
});

// app.get('/api/form', function (req, res) {
//     res.setHeader('Content-Type', 'application/json');	
//     db.receiveAllData(function(result){
// 		res.send(result);
// 		res.end();
// 	});
// });

app.listen(config.server.port, function () {
  console.log('app listening on port ' + config.server.port);
});

// Put a friendly message on the terminal
console.log("Server running at " + config.server.address + config.server.port);


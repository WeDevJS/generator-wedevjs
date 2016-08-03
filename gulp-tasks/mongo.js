var exec = require('child_process').exec,
    config = require('../config/gulp.config'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      lazy: true
    });


gulp.task("mongo-start", function() {
  var running = false;
  var command = "mongod --dbpath=./server/db/data/";
  runCommand(running, command, function(err){
    console.log(err);
  });
});

var runCommand = function(running, command, cb) {
    if (running === false){
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if (err !== null) {
        console.log('exec error: ' + err);
      }
      cb(err);
    });
  }else{
    console.log("Mongo is already running");
  }
}
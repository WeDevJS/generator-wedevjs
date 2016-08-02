var exec = require('child_process').exec,
    config = require('../config/gulp.config'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      lazy: true
    });


gulp.task("mongo-start", function(done) {
  var command = "mongod --dbpath=./server/db/data/";
  runCommand(command, done);
});

var runCommand = function(command, cb) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
    cb()
  });
}
// Include Gulp task files
'use strict';

var gulp = require('gulp'),
  wrench = require('wrench');

wrench
  .readdirSyncRecursive('./gulp-tasks')
  .filter(function(file) {
    return (/\.(js)$/i).test(file);
  })
  .map(function(file) {
    require('./gulp-tasks/' + file);
  });
gulp.task('default',['jade','scripts','test','styles', 'mongo-start','wiredep','nodemon','browser-sync']);
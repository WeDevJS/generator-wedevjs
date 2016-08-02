'use strict';
var exec = require('child_process').exec;
var mkdirs = require('mkdirs');

var config = require('./config/gulp.config');

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
	    lazy: true,
	    rename:{
	    	'gulp-minify-css':'minifycss',
	    	'gulp-sass-lint':'sassLint',
	    }
	});

var browserSync = require('browser-sync').create();
var wiredep = require("wiredep").stream;

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
gulp.task('default',['jade','scripts','test','styles', 'mongo-start', 'inject','wiredep','nodemon','browser-sync']);
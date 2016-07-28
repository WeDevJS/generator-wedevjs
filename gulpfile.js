'use strict';

var config = require('./config/gulp.config')();

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
	    lazy: true,
	    rename:{
	    	'gulp-minify-css':'minifycss',
	    	'gulp-sass-lint':'sassLint',
	    }
	});

var browserSync = require('browser-sync').create();

/**
 * Tasks
 */


//task default
gulp.task('default',['jade','scripts','test','styles','browser-sync']);


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("./src/sass/*.scss", ['styles','reload']);
    gulp.watch("./src/js/*.js", ['scripts','test','reload']);
    gulp.watch("./src/*.jade",['jade','reload']);
});

// Browser Sync wrapper task 
// allows for proper injection of css files
gulp.task('reload', function(cb) {
    browserSync.reload();
    cb();
});

// jade compile to HTML
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/*.jade')
    .pipe(plugins.jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

// testing
gulp.task('test',function(){
    return gulp.src('test/test.js', {read: false})
        .once('error', function() {
            process.exit(1);
        })
        .pipe(plugins.mocha({reporter: 'progress'}));
});

// lint and minify js
gulp.task('scripts', function() {
    gulp.src(config.baseJS)
        .pipe(plugins.jshint({node:true}))  
        .pipe(plugins.jshint.reporter(config.jsReporter));

    return gulp.src(config.srcJS)
        .pipe(plugins.jshint({node:true}))
        .pipe(plugins.jshint.reporter(config.jsReporter))
        .pipe(gulp.dest(config.jsDir))
        
});

// task to compile sass, prefix and minify css
gulp.task('styles', function() {
    return gulp.src(config.sassDir)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassLint())
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sassLint.failOnError())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.minifycss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssDir));
});

// Testing framework

// Watch JS for changes
gulp.task('watch', function() {
    gulp.watch(config.srcJS, ['scripts']);
    gulp.watch(config.sassDir, ['styles']);
});
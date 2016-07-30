'use strict';

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

/**
 * Tasks
 */

//task default
gulp.task('default',['jade','scripts','test','styles','nodemon','browser-sync']);


// Nodemon task
gulp.task('nodemon', function (done) {
    var running = false;

  return plugins.nodemon({
    script: './server/server.js',
    watch: config.serverFiles,
  }).on('start', function() {
            if(!running){
                done();
            }
            running = true;
        }).on('restart', ['lintServer','test'],function(){
            setTimeout(browserSync.reload({stream: false}),500);        
        })
    }
);

// frontend sync server
gulp.task('browser-sync', function() {
    browserSync.init(null,{
        proxy: config.serverAddress + config.serverPort,
        port: 10080
    });

    gulp.watch("./src/sass/*.scss", ['styles','reload']);
    gulp.watch(config.srcJS, ['scripts','test','reload']);
    gulp.watch("./src/views/**/*.jade",['jade','reload']);
});

// Browser Sync wrapper task 
// allows for proper injection of css files
gulp.task('reload',function(){
    browserSync.reload();
});

// jade compile to HTML
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/views/*.jade')
    .pipe(plugins.jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

// Backend testing
gulp.task('test',function(){
    return gulp.src('test/test.js', {read: false})
        .once('error', function() {
            process.exit(1);
        })
        .pipe(plugins.mocha({reporter: 'progress'}));
});

// lint and minify js
gulp.task('lintServer', function() {
    gulp.src(config.serverFiles)
        .pipe(plugins.jshint({node:true}))  
        .pipe(plugins.jshint.reporter(config.jsReporter));        
});

// lint and minify js
gulp.task('scripts', function() {
    // Created 2 lints so gulp doesnt write non app files that need linting
    gulp.src([config.baseJS,config.serverFiles])
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
        .pipe(plugins.sassLint({configFile: './config/sass/.sass-lint.yml'})
        .on('error', function(e){console.log(e)}))
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.minifycss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssDir));
});
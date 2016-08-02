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

/**
 * Tasks
 */

//task default
gulp.task('default',['jade','scripts','test','styles', 'mongo-start','nodemon','browser-sync','reload']);


// Nodemon task
gulp.task('nodemon', function (done) {
    var running = false;

  return plugins.nodemon({
    script: config.server.serverConfig,
    watch: [config.server.files,config.server.ignoreDB],
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
        proxy: config.server.address + config.server.port,
        port: 10080
    });

    gulp.watch(config.client.sass, ['styles','reload']);
    gulp.watch(config.client.js, ['scripts','test','reload']);
    gulp.watch(config.client.jade,['jade','reload']);
});

// Browser Sync wrapper task 
// allows for proper injection of css files
gulp.task('reload',function(){
    browserSync.reload();
});

// jade compile to HTML
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src([config.client.jade, config.client.jadeExcludes])
    .pipe(plugins.jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(config.dist.base))
});

// Backend testing
gulp.task('test',function(){
    return gulp.src(config.test.testConfig, {read: false})
        .once('error', function() {
            process.exit(1);
        })
        .pipe(plugins.mocha({reporter: 'progress'}));
});

// lint and minify js
gulp.task('lintServer', function() {
    gulp.src([config.server.files, config.server.ignoreDB])
        .pipe(plugins.jshint({node:true}))  
        .pipe(plugins.jshint.reporter(config.jsReporter));        
});

// lint and minify js
gulp.task('scripts', function() {
    // Created 2 lints so gulp doesnt write non app files that need linting
    gulp.src([config.base,config.server.files, config.server.ignoreDB])
        .pipe(plugins.jshint({node:true}))  
        .pipe(plugins.jshint.reporter(config.jsReporter));

    return gulp.src(config.client.js)
        .pipe(plugins.jshint({node:true}))
        .pipe(plugins.jshint.reporter(config.jsReporter))
        .pipe(plugins.rename({suffix:'.min'}))
        .pipe(plugins.uglify().on('error',function(){
                
        }))
        .pipe(gulp.dest(config.dist.js))
        
});

// task to compile sass, prefix and minify css
gulp.task('styles', function() {
    return gulp.src(config.client.sass)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassLint({configFile: config.client.sassGuide})
        .on('error', function(e){console.log(e)}))
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.minifycss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.css));
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

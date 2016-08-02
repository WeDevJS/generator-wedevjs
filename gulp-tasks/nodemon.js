var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        lazy: true,
    }),
    config = require('../config/gulp.config'),
    browserSync = require('browser-sync').create();

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
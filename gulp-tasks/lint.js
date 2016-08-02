var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    config = require('../config/gulp.config');

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
'use strict';

var config = require('./gulp.config')();

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
	    lazy: true,
	    rename:{
	    	'gulp-minify-css':'minifycss',
	    	'gulp-sass-lint':'sassLint'
	    }
	});
/**
 * Tasks
 */

//task default
gulp.task('default',['styles','lint']);

// lint js
gulp.task('lint', function() {
    return gulp.src(config.srcJS)
        .pipe(plugins.jshint({node:true}))
        .pipe(plugins.jshint.reporter(config.jsReporter));
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

// Watch JS for changes
gulp.task('watch', function() {
    gulp.watch(config.srcJS, ['lint']);
    gulp.watch(config.sassDir, ['styles']);
});
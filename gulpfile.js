'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

//constants paths
const paths = {
    client: {
        css:'./css',
        sass:'sass/**/*.scss'
    }
}
/**
 * Tasks
 */

// process files sass to css
// minify files
// rename css
gulp.task('styles',function(){
	gulp.src(paths.client.sass) 
	.pipe(sass().on('error',sass.logError))//sass to css, if it returns a compilation error stops execution
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
        cascade: false
	}))
	.pipe(gulp.dest(paths.client.css)) //add to folder the files minify
	.pipe(rename({suffix: '.min'})) //rename the css adding ".min"
    .pipe(minifycss()) //minify css
    .pipe(gulp.dest(paths.client.css)); //add to folder the files minify 

});
//sub-task of 'styles'
//observe Each time a file css is processed
gulp.task('styles:watch',function(){
	gulp.watch(paths.client.sass,['styles']);
});

//task default
gulp.task('default',['styles:watch'],function(){

});
'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins=require('gulp-load-plugins'),
	plugins = gulpLoadPlugins({
	    lazy: true,
	    rename:{
	    	'gulp-sass':'sass',
	    	'gulp-autoprefixer':'autoprefixer',
	    	'gulp-minify-css':'minifycss',
	    	'gulp-rename':'rename',
	    	'gulp-sass-lint':'sassLint'
	    }
	});
//constants paths
const paths = {
    client: {
        css:'./dist/css/',
        sass:'./src/sass/**/*.scss',
    },
    config:{
    	sass_lint:'config/sass/*.sass-lint.yml'
    }
}
/**
 * Tasks
 */

// The first task is to verify that no errors styles
gulp.task('styles',['styles:lint'],function(){
	gulp.src(paths.client.sass) 
	.pipe(plugins.sass().on('error',plugins.sass.logError))//sass to css, if it returns a compilation error stops execution
	.pipe(plugins.autoprefixer({ // autoprefixer
		browsers: ['last 2 versions'],
        cascade: false
	}))
	.pipe(gulp.dest(paths.client.css)) //add to folder the files minify
	.pipe(plugins.rename({suffix: '.min'})) //rename the css adding ".min"
    .pipe(plugins.minifycss()) //minify css
    .pipe(gulp.dest(paths.client.css)); //add to folder the files minify 

});


//observe Each time a file css is processed
gulp.task('styles:watch',function(){
	gulp.watch(paths.client.sass,['styles']);
});

//in the future to add more linter style tasks
gulp.task('styles:lint', ['styles:lint:sass'], function(){});

//special task for errors in compilation of linter styles sass
gulp.task('styles:lint:sass',function(){
	return gulp.src(paths.client.sass)
    .pipe(plugins.sassLint({
      config: paths.config.sass_lint
    }))
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError())
})

//task default
gulp.task('default',['styles','styles:watch'],function(){
	
});

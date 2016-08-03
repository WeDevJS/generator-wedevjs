var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
	    lazy: true
	}),
 	config = require('../config/gulp.config');

// Backend testing
gulp.task('test',['nodemon'],function(){
    return gulp.src(config.test.testConfig, {read: false})
        .once('error', function() {
            process.exit(1);
        })
        .pipe(plugins.mocha({reporter: 'list'}));
});

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
	    lazy: true
	}),
 	config = require('../config/gulp.config'),
    wiredep = require("wiredep").stream;

gulp.task("wiredep", function () {
    return gulp.src([config.client.base+"/views/includes/footer.jade",config.client.base+"/views/includes/header.jade"])
    .pipe(wiredep({
        directory: "./bower_components",
        ignorePath: '../../../',
        read: false,
        onError: function (err) {
            console.log(err.code);
        }
    }))
    .pipe(gulp.dest(config.client.base+'views/includes/'));
});

// Inject dependencies
gulp.task("inject", ["wiredep"] ,function () {
    var sources = gulp.src([config.client.js, config.client.css], {read: false});

    return gulp.src(config.client.base+"index.html")
    .pipe(plugins.inject(sources))
    .pipe(gulp.dest(config.client.base));
});
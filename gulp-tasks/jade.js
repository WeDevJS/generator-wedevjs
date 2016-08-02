var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        lazy: true,
        rename:{
            'gulp-minify-css':'minifycss',
            'gulp-sass-lint':'sassLint',
        }
    }),
    config = require('../config/gulp.config');

// jade compile to HTML
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src([config.client.Allviews, config.client.excludeViewsInclude])
    .pipe(plugins.jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(config.dist.base))
});
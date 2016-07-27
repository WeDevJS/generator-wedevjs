var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true
});
var config = require('./gulp.config')();

gulp.task('workflow', function () {
  gulp.src(config.sassDir)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.cssnano())
    .pipe(plugins.sourcemaps.write('./'))

  .pipe(gulp.dest(config.cssDir))
});
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true
});
var config = require('./gulp.config')();

gulp.task('lint', function() {
  return gulp.src(config.srcJS)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// task to compile sass, prefix and minify css
gulp.task('workflow', function(done) {
    gulp.src(config.sassDir)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            style: 'compressed',
            errLogToConsole: false,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.cssnano())
        .pipe(plugins.sourcemaps.write('./'))

    .pipe(gulp.dest(config.cssDir))
        .pipe(plugins.notify({
            message: 'Styles task complete'
        }));

    done();

});
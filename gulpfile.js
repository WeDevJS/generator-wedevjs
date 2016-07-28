var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true
});
var config = require('./gulp.config')();

// Default gulp task
gulp.task('default', ['watch']);

// lint and minify js
gulp.task('lint', function() {
    return gulp.src(config.srcJS)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(config.jsReporter));
});

// task to compile sass, prefix and minify css
gulp.task('styles', function(done) {
    gulp.src(config.sassDir)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.pipe(plugins.sass().on('error', plugins.notify(plugins.sass.logError))))
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

// Watch JS for changes
gulp.task('watch', function() {
    gulp.watch(config.srcJS, ['lint']);
    gulp.watch(config.sassDir, ['styles']);
});

function exceptionLog(error) {
    console.log(error.toString());
    this.emit('end');
}
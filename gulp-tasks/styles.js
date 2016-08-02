var config = require('../config/gulp.config'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      lazy: true,
      rename:{
        'gulp-minify-css':'minifycss',
        'gulp-sass-lint':'sassLint',
        }
    });

// task to compile sass, prefix and minify css
gulp.task('styles', function() {
    return gulp.src(config.client.sass)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassLint({configFile: config.client.sassGuide})
        .on('error', function(e){console.log(e)}))
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.minifycss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist.css));
});
var browserSync = require('browser-sync').create(),
    config = require('../config/gulp.config'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      lazy: true
    }),
    browserSync = require('browser-sync').create();

// frontend sync server
gulp.task('browser-sync', function() {
    browserSync.init(null,{
        proxy: config.server.address + config.server.port,
        port: 10080
    });

    gulp.watch(config.client.sass, ['styles','reload']);
    gulp.watch(config.client.js, ['scripts','inject','test','reload']);
    gulp.watch(config.client.css,['inject']);
    gulp.watch(config.client.Allviews,['jade','reload']);
    gulp.watch("./bower.json", ["wiredep"]);
});

// Browser Sync wrapper task 
// allows for proper injection of css files
gulp.task('reload',function(){
    browserSync.reload();
});
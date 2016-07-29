module.exports = function() {
    var config = {
        sassDir: './src/sass/**/*.scss',
        cssDir: './dist/css/',
        srcJS: './src/js/**/*.js',
        baseJS: './',
        jsDir: './dist/js/',
        jsReporter: 'jshint-stylish',
        serverFiles: 'server/**/*.*',
        serverPort: 8080,
        serverAddress: 'http://localhost:'
    };
    
    return config;
}();
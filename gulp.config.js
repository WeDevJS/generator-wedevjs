module.exports = function() {
    var config = {
        sassDir: './src/sass/**/*.scss',
        cssDir: './dist/css/',
        srcJS: ['./src/js/**/*.js','./*.js'],
        jsReporter: 'jshint-stylish'
    };
    
    return config;
};
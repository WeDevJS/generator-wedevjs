module.exports = function() {
    const config = {
        base: './',
        client:{
            base:'./app/',
            sass: './app/assets/styles/**/*.scss',
            css: './app/assets/styles/**/*.css',
            sassGuide:'./config/sass/.sass-lint.yml',
            js: './app/assets/scripts/**/*.js',
            images:'./app/assets/images/',
            views:'./app/views/**/*.jade'
        },
        server:{
            serverConfig:'./server/server.js',
            files: 'server/**/*.*',
            port: 3000,
            address: 'http://localhost:',
            // MongoDB connection options
            mongo: {
                url: 'mongodb://localhost/wedevjs',
                options:{

                }
            }
        },
        dist:{
            base:'/dist/',
            css: '/dist/css/',
            js: './dist/js/'
        },
        test:{
            testConfig:'test/test.js'
        }, 
        jsReporter: 'jshint-stylish'
       
    };
    
    return config;
}();
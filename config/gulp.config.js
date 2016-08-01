module.exports = function() {
    const config = {
        base: './',
        client:{
            sass: './src/sass/**/*.scss',
            sassGuide:'./config/sass/.sass-lint.yml',
            js: './src/js/**/*.js',
            jade:'./src/views/**/*.jade'
        },
        server:{
            serverConfig:'./server/server.js',
            files: 'server/**/*.*',
            ignoreDB: '!server/db/data/**/**.*',
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
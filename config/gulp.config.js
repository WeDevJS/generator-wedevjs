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
            Allviews:'./app/views/**/*.jade',
            views:'./app/views/',
            excludeViewsInclude:'!app/views/includes/**/*.jade'
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
            base:'./dist/',
            css: './dist/css/',
            js: './dist/js/'
        },
        test:{
            testConfig:'test/test.js'
        }, 
        jsReporter: 'jshint-stylish'
       
    };
    
    return config;
}();
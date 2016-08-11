var mocha = require('mocha'),
	chai = require('chai'),
	config = require('../config/gulp.config'),
	server = config.server.address + config.server.port,
	request = require('superagent');

var assert = require('chai').assert;
describe('HomePage', function() {
  describe('Status Code', function() {
    it('should return a 200 status code', function(done) {
       request
		   .get(server)
		   .end(function(err, res){
		   		assert(res.status === 200, "Response to homepage should be 200 and not " + res.status);
		   		done();
	   });
    });
  });
});
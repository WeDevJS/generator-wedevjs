var mongoose = require('mongoose');


var config = require('../../config/gulp.config');
var FormSchema = new mongoose.Schema({
    name: String,
    created: {type: Date, default: Date.now}
}, {collection: "form"});

var Form = mongoose.model("Form", FormSchema);

// retreive data


// new form
// var form1 = new Form({ name: "Form 1", created: new Date() });
// save the form
// form1.save();

console.log('connected to db');
mongoose.connect(config.server.mongo.url, config.server.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
module.exports = {
	receiveAllData : function (cb){
			Form.find(function(err, data){
				result = (err) ? err : data;
				cb(result);
			});
	}
};
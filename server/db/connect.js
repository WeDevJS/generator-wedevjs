var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

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

module.exports = {
	receiveAllData : function (cb){
			Form.find(function(err, data){
				result = (err) ? err : data;
				cb(result);
			});
	}
};
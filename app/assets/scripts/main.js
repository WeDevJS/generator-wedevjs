var app = angular.module('app', []);

app.service('helloService', function(){
	this.helloService = function(){
		console.log('Hello Service');
	}
})

app.factory('helloFactory', function(){
	var factory = {};

	factory.helloFactory = function(){
		console.log('Hello Factory');
	};
	return factory
})

app.controller('mainController', function(helloService, helloFactory){
	helloFactory.helloFactory();
	helloService.helloService();
});

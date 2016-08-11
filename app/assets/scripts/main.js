// carusel
// $('.carousel').carousel();

var app = angular.module('app', ['ngResource']);

app.config(['$resourceProvider', '$locationProvider',
	// function ($routeProvider, $locationProvider){
	// $locationProvider.html5Mode(true);
	// $routeProvider
	// 	.when('/',{
	// 		templateUrl: 'partials/index.jade',
	// 		controller: 'mainController'
	// 	})
	// 	.when('/about',{
	// 		templateUrl: 'partials/about.jade',
	// 		controller: 'mainController'
	// 	})
	// 	.when('/contact',{
	// 		templateUrl: 'partials/contact.jade',
	// 		controller: 'mainController'
	// 	}).otherwise('/');
});


app.controller('mainController', function(){
	console.log("Hello");
});

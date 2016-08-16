var app=angular.module('app', [
	'ui.router',
	'pascalprecht.translate',
	])
.config(['$urlRouterProvider', '$locationProvider','$translateProvider',function($urlRouterProvider, $locationProvider,$translateProvider) {
	$urlRouterProvider
	.otherwise('/');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$translateProvider.translations('en-US', {
		'menu.home':'Home',
		'menu.contact':'Contact',
		'menu.about':'About',
	});
	$translateProvider.translations('es', {
		'menu.home':'Inicio',
		'menu.contact':'Contacto',
		'menu.about':'Acerca De',
	});
	$translateProvider.preferredLanguage('es');
}]);


var app=angular.module('app', [
  'ui.router',
])
.config(['$urlRouterProvider', '$locationProvider',function($urlRouterProvider, $locationProvider) {
$urlRouterProvider
  .otherwise('/');

// $locationProvider.html5Mode(true);
}]);


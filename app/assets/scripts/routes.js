app.config(['$stateProvider',function($stateProvider){
	$stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'assets/home/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
      })
      .state('about',{
      	url: '/about',
      	templateUrl: 'assets/about/about.html',
      	controller: 'aboutController',
      	controllerAs: 'aboutCtrl'
      })
      .state('contact',{
      	url: '/contact',
      	templateUrl: 'assets/contact/contact.html',
      	controller: 'contactController',
      	controllerAs: 'contactCtrl'
      });
}]);
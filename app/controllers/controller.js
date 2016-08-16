app.controller('mainController', ['$scope','$translate',function($scope,$translate){
	$scope.changeLanguage = function (key) {
		$translate.use(key);
	};
}]);
app.controller('homeController', ['$scope',function($scope){
	
}]);
app.controller('aboutController', ['$scope',function($scope){
	
}]);
app.controller('contactController', ['$scope',function($scope){
	
}]);
angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', '$httpParamSerializerJQLike',
  function($scope, $rootScope, $http, $location, $httpParamSerializerJQLike) {
  $scope.error = false;
  $rootScope.selectedTab = $location.path() || '/';

  $scope.credentials = {};
  $scope.login = function() {
    // We are using formLogin in our backend, so here we need to serialize our form data
    $http.post('auth/login',
      $scope.credentials)
    .then(function(data) {
      $rootScope.authenticated = true;
      $location.path("#/");
      $rootScope.selectedTab = "/";
      $scope.error = false;
      $http.defaults.headers.common.Authorization= 'Bearer ' + data.data.access_token;
      var expireDate = new Date (new Date().getTime() + (1000 * data.data.expires_in));
      $cookies.put("access_token", data.data.access_token, {'expires': expireDate});
    })
    .catch(function() {
      $rootScope.authenticated = false;
      $location.path("/login");
      $rootScope.selectedTab = "/login";
      $scope.error = true;
    });
  };
}]);

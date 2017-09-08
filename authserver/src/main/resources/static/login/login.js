angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', '$httpParamSerializer','$cookies',
  function($scope, $rootScope, $http, $location, $httpParamSerializer, $cookies) {
  $scope.error = false;
  $rootScope.selectedTab = $location.path() || '/';

  $scope.credentials ={
       grant_type:"password",
       username: "",
       password: "",
       client_id: "trusted-app"
   };
   $scope.encoded = btoa("trusted-app:secret");
   $scope.login = function() {
        var req = {
            method: 'POST',
            url: "http://localhost:8080/oauth/token",
            headers: {
                "Authorization": "Basic " + $scope.encoded,
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            data: $httpParamSerializer($scope.credentials)
        }
        $http(req).then(function(data){
            $rootScope.authenticated = true;
            $location.path("#/");
            $rootScope.selectedTab = "/";
            $scope.error = false;
            $http.defaults.headers.common.Authorization =
              'Bearer ' + data.data.access_token;
            $cookies.put("access_token", data.data.access_token);
            $cookies.put("refresh_token", data.data.refresh_token);
        }, function(reason){
            $rootScope.authenticated = false;
            $location.path("/login");
            $rootScope.selectedTab = "/login";
            $scope.error = true;
        });
   }
}]);

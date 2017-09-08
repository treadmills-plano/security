var app = angular.module('myApp', ["ngResource","ngRoute","oauth"]);
app.config(function($locationProvider) {
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');
});

app.controller('mainCtrl', function($scope,$resource,$http) {
    $scope.$on('oauth:login', function(event, token) {
        $http.defaults.headers.common.Authorization= 'Bearer ' + token.access_token;
    });

    $scope.foo = {id:0 , name:"sample foo"};
    $scope.foos = $resource(
      "http://localhost:8090/printSystemOut",
      {});
    $scope.getFoo = function(){
        $scope.foo = $scope.foos.get({fooId:$scope.foo.id});
    }
});
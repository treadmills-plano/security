'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.dashboard',
  'myApp.services',
  'ngCookies'
]).
config(['$locationProvider', '$routeProvider', "$httpProvider", function($locationProvider, $routeProvider, $httpProvider) {

	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  $routeProvider.otherwise({redirectTo: '/'});
}])
.controller('NavigationCtrl', ['$scope', '$rootScope', '$http', '$location', '$cookies',
  function($scope, $rootScope, $http, $location, $cookies) {
  var self = this
  $rootScope.selectedTab = $location.path() || '/';
    if($cookies.get("access_token")){
        $rootScope.authenticated = true;
    }
  $scope.logout = function() {
    $http.post('oauth/logout', {}).finally(function() {
      $rootScope.authenticated = false;
      $location.path("#/");
      $rootScope.selectedTab = "/";
    });
  }

  $scope.setSelectedTab = function(tab) {
    $rootScope.selectedTab = tab;
  }

  $scope.tabClass = function(tab) {
    if ($rootScope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }

  if ($rootScope.authenticated) {
    $location.path('/');
    $rootScope.selectedTab = '/';
    return;
  }
}]);

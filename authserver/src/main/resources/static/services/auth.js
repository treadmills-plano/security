angular.module('myApp.services', [])
.factory('AuthService', function($http, $cookies) {
	var user = null;
    if($cookies.get("access_token")){
        $http.defaults.headers.common.Authorization =
          'Bearer ' + $cookies.get("access_token");
    }
  return {
    getUser: function() {
			return $http.get('/users');
		},
	getRemoteResourceUser: function(){
	    return $http.get("http://localhost:8090/users")
	}
  };
});
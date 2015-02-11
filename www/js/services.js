angular.module('starter.services', ['http-auth-interceptor'])
// AUTH SERVICE
.factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend) {
  var service = {
    login: function(user) {
      $http.post('http://inoffice.promotiongroup.lv/api/auth/login', { user: user }, { ignoreAuthModule: false })
      .success(function (data, status) {
        authService.loginConfirmed(data);
      })
    }, 
    loginCancelled: function() {
      authService.loginCancelled();
    }
  };
  return service;
})
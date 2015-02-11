angular.module('starter.controllers')
.controller('AuthController', function($scope, $http, $state, AuthenticationService) {
  $scope.user = {
    email: null,
    phone: null,
    password: null,
    password_confirmation: null
  };

  // LOGIN FUNCTION
  $scope.signIn = function() {
    AuthenticationService.login($scope.user);
  };

  // REGISTER FUNCTION
  $scope.signUp = function() {
    $http.post('http://inoffice.promotiongroup.lv/api/auth/sign-up', $scope.user).
    success(function(data, status, headers, config) {
      window.localStorage.setItem("authorized", "true");
      window.localStorage.setItem("isAdmin", "true");
      window.localStorage.setItem("isUser", "false");
      window.localStorage.setItem("uid", data.id);
      window.localStorage.setItem("firstTime", "true");
      window.localStorage.setItem("setupDone", "false");

      $state.go('admin-first-time', {});
    })
  };

  // FORGOT PASSWORD FUNCTION
  $scope.forgotPassword = function() {
    $http.post('http://inoffice.promotiongroup.lv/api/auth/password', {email: $scope.user.email}).
    success(function(data, status, headers, config) {
      if(data == true) {
        $scope.message = 'Password sent to ' + $scope.user.email;
      } else {
        $scope.message = 'User with email ' + $scope.user.email + ' not found!';
      }
    })

  };

  // START USING APP
  $scope.firstTimeDone = function(type) {
    $http.post('http://inoffice.promotiongroup.lv/api/first-time', {uid: window.localStorage.getItem("uid")}).
    success(function(data, status, headers, config) {
      window.localStorage.setItem("firstTime", "false");

      if(type == "user") {
        $state.go('user-setup', {});
      } else {
        $state.go('admin-setup', {});
      }
    })
  };
 
  // LOG-IN SUCCESS
  $scope.$on('event:auth-loginConfirmed', function(header, data) {
    if(data == false) {
      $scope.message = 'Wrong e-mail or/and password combination';
    } else {
      window.localStorage.setItem("authorized", "true");
      window.localStorage.setItem("uid", data.id);

      if(data.type == "1") {
        window.localStorage.setItem("isAdmin", "true");
        window.localStorage.setItem("isUser", "false");
        if(data.first_time == "1") {
          window.localStorage.setItem("firstTime", "true");
          $state.go('admin-first-time', {});
        } else if(data.setup_done == "0") {
          window.localStorage.setItem("setupDone", "false");
          $state.go('admin-setup', {});
        } else {
          window.localStorage.setItem("setupDone", "true");
          window.localStorage.setItem("firstTime", "false");
          $state.go('admin', {});
        }
      } else {
        window.localStorage.setItem("isAdmin", "false");
        window.localStorage.setItem("isUser", "true");
        if(data.first_time == "1") {
          window.localStorage.setItem("firstTime", "true");
          $state.go('user-first-time', {});
        } else if(data.setup_done == "0") {
          window.localStorage.setItem("setupDone", "false");
          $state.go('user-setup', {});
        } else {
          window.localStorage.setItem("setupDone", "true");
          window.localStorage.setItem("firstTime", "false");
          $state.go('user', {});
        }
      }
    }
  });
})
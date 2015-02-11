angular.module('starter.controllers', [])
.controller('LoadingController', function($scope, $http, $state, $interval, AuthenticationService) {
  auth = {
    authorized: (window.localStorage.getItem("authorized") != null ? window.localStorage.getItem("authorized") : "false"),
    uid:        (window.localStorage.getItem("uid") != null ? window.localStorage.getItem("authorized") : null),
    isAdmin:    (window.localStorage.getItem("isAdmin") != null ? window.localStorage.getItem("isAdmin") : "false"),
    isUser:     (window.localStorage.getItem("isUser") != null ? window.localStorage.getItem("isUser") : "false"),
    firstTime:  (window.localStorage.getItem("firstTime") != null ? window.localStorage.getItem("firstTime") : "true"),
    setupDone:  (window.localStorage.getItem("setupDone") != null ? window.localStorage.getItem("setupDone") : "true")
  };

  $scope.percents = 0;
  var interval    = $interval(function(){$scope.increment();}, 50);


  $scope.increment = function() {
    if($scope.percents !== 100) {
      $scope.percents = $scope.percents+1;
    } else {
      $interval.cancel(interval);

      if(auth.authorized == "false") {
        $state.go('auth', {});
      } else if(auth.isAdmin == "true") {
        if(auth.firstTime == "true") {
          $state.go('admin-first-time', {});
        } else if(auth.setupDone == "false") {
          $state.go('admin-setup', {});
        } else {
          $state.go('admin', {});
        }
      } else {
        if(auth.firstTime == "true") {
          $state.go('user-first-time', {});
        } else if(auth.setupDone == "false") {
          $state.go('user-setup', {});
        } else {
          $state.go('user', {});
        }
      }
    }
  };
})
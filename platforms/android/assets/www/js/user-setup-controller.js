angular.module('starter.controllers')
.controller('UserSetupController', function($scope, $http, $state, AuthenticationService) {
  // FALLBACK VARIABLES
  $scope.setup = {
    uid: window.localStorage.getItem("uid"),
    first_name: null,
    last_name: null,
    position: null
  };

  $scope.next = function() {
    console.log($scope.setup)
    $http.post('http://inoffice.promotiongroup.lv/api/user/setup-1', $scope.setup).
    success(function(data, status, headers, config) {
      $state.go('user-setup-picture', {});
    })
  };

  $scope.finish = function() {
    console.log($scope.setup);
    // AJAX UPDATE PROFILE
    window.localStorage.setItem("setupDone", "true");
    $state.go('user', {});
  };
});
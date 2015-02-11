angular.module('starter.controllers')
.controller('AdminSetupController', function($scope, $http, $state, AuthenticationService) {
  // FALLBACK VARIABLES
  $scope.setup = {
    uid: window.localStorage.getItem("uid"),
    first_name: null,
    last_name: null,
    position: null,
    company_name: null,
    city: null,
    country: null,
    employees: null
  };

  $scope.next = function() {
    $http.post('http://inoffice.promotiongroup.lv/api/admin/setup-1', $scope.setup).
    success(function(data, status, headers, config) {
      $state.go('admin-setup-second', {});
    })
  };

  $scope.finish = function() {
    // AJAX UPDATE PROFILE
    $http.post('http://inoffice.promotiongroup.lv/api/admin/setup-2', $scope.setup).
    success(function(data, status, headers, config) {
      window.localStorage.setItem("setupDone", "true");
      $state.go('admin', {});
    })
  };
})
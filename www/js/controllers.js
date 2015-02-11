angular.module('starter.controllers', [])
// LOADING CONTROLLER
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

  $scope.$watch('$viewContentLoaded', function() {
      interval;
  });

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






// AUTH CONTROLLER
.controller('AuthController', function($scope, $http, $state, AuthenticationService) {
  // FALLBACK VARIABLES
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

























// ADMIN CONTROLLER
.controller('AdminController', function($scope, $http, $state, AuthenticationService) {

})



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




// USER CONTROLLER
.controller('UserController', function($scope, $http, $state, AuthenticationService) {

})




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
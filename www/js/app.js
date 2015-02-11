angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {
  // $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
  //   var user = {
  //     username: angular.fromJson(data).user.username,
  //     password: angular.fromJson(data).user.password
  //   };

  //   // if data.status == true && data.type == 1
  //   // set uid
  //   // set first time or not
  //   if(user.username == 'admin') {
  //     window.localStorage.setItem("authorized", "true");
  //     window.localStorage.setItem("isAdmin", "true");
  //     window.localStorage.setItem("isUser", "false");
  //     window.localStorage.setItem("uid", "1");
  //     window.localStorage.setItem("firstTime", "true");
  //     window.localStorage.setItem("setupDone", "false");

  //     return  [200, { authorized:true, isAdmin:true, isUser:false, firstTime: true }];
  //   // if data.status == true && data.type == 2
  //   // set uid
  //   // set first time or not
  //   } else if(user.username == 'user') {
  //     window.localStorage.setItem("authorized", "true");
  //     window.localStorage.setItem("isAdmin", "false");
  //     window.localStorage.setItem("isUser", "true");
  //     window.localStorage.setItem("uid", "1");
  //     window.localStorage.setItem("firstTime", "true");
  //     window.localStorage.setItem("setupDone", "false");

  //     return  [200, { authorized:true, isAdmin:false, isUser:true, firstTime: true }];
  //   // if data.status == false
  //   } else {
  //     window.localStorage.removeItem("authorized");
  //     window.localStorage.removeItem("isAdmin");
  //     window.localStorage.removeItem("isUser");
  //     window.localStorage.removeItem("uid");
  //     window.localStorage.removeItem("firstTime");
  //     window.localStorage.setItem("setupDone", "false");

  //     return  [400, { authorized:false, isAdmin:false, isUser:false, firstTime: false }];
  //   }
  // });

  // $httpBackend.whenGET(/.*/).passThrough();

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // AUTH ROUTES
  .state('loading', {
    url: "/loading",
    templateUrl: "templates/loading/index.html",
    controller: 'LoadingController'
  })
  .state('auth', {
    url: "/auth",
    templateUrl: "templates/auth/index.html",
    controller: 'AuthController'
  })
  .state('auth-login', {
    url: "/auth-login",
    templateUrl: "templates/auth/login.html",
    controller: 'AuthController'
  })
  .state('auth-register', {
    url: "/auth-register",
    templateUrl: "templates/auth/register.html",
    controller: 'AuthController'
  })
  .state('auth-forgot-password', {
    url: "/auth-password",
    templateUrl: "templates/auth/forgot-password.html",
    controller: 'AuthController' 
  })





  // USER ROUTES
  .state('user', {
    url: "/user",
    templateUrl: "templates/user/dashboard.html",
    controller: 'UserController'
  })
  .state('user-setup', {
    url: "/user-setup",
    templateUrl: "templates/user/setup-1.html",
    controller: 'UserSetupController'
  })
  .state('user-setup-picture', {
    url: "/user-setup-picture",
    templateUrl: "templates/user/setup-2.html",
    controller: 'UserSetupController'
  })
  .state('user-first-time', {
    url: "/user-first-time",
    templateUrl: "templates/user/first-time.html",
    controller: 'UserController' 
  })
  .state('user-employees', {
    url: "/user-employees",
    templateUrl: "templates/user/employees.html",
    controller: 'UserController'
  })
  .state('user-settings', {
    url: "/user-settings",
    templateUrl: "templates/user/settings.html",
    controller: 'UserController'
  })




  
  // ADMIN ROUTES
  .state('admin', {
    url: "/admin",
    templateUrl: "templates/admin/dashboard.html",
    controller: 'AdminController'
  })
  .state('admin-setup', {
    url: "/admin-setup",
    templateUrl: "templates/admin/setup-1.html",
    controller: 'AdminSetupController'
  })
  .state('admin-setup-second', {
    url: "/admin-setup-second",
    templateUrl: "templates/admin/setup-2.html",
    controller: 'AdminSetupController'
  })
  .state('admin-first-time', {
    url: "/admin-first-time",
    templateUrl: "templates/admin/first-time.html",
    controller: 'AdminController'
  })
  .state('admin-settings', {
    url: "/admin-settings",
    templateUrl: "templates/admin/settings.html",
    controller: 'AdminController'
  });

  $urlRouterProvider.otherwise('/loading');
});
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
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
  .state('user-first-time', {
    url: "/user-first-time",
    templateUrl: "templates/user/first-time.html",
    controller: 'UserController' 
  })
  .state('user-setup', {
    url: "/user-setup",
    templateUrl: "templates/user/setup-1.html",
    controller: 'UserSetupController'
  })
  .state('user-setup-second', {
    url: "/user-setup-second",
    templateUrl: "templates/user/setup-2.html",
    controller: 'UserSetupController'
  })
  // ADMIN ROUTES
  .state('admin', {
    url: "/admin",
    templateUrl: "templates/admin/dashboard.html",
    controller: 'AdminController'
  })
  .state('admin-first-time', {
    url: "/admin-first-time",
    templateUrl: "templates/admin/first-time.html",
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

  $urlRouterProvider.otherwise('/loading');
});
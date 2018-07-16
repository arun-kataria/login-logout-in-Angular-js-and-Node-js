(function() {
    'use strict';

    angular.module('app', [
            "ui.router",
            "ngStorage"
        ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider.state("login", {
                url: "/login",
                templateUrl: "/views/user/login.html",
                controller: "loginController"
            }).state("logout", {
                url: "/logout",
                templateUrl: "/views/user/logout.html",
                controller: "logoutController"
            }).state("home", {
                url: "/home",
                templateUrl: "/views/user/home.html",
            }).state("users", {
                url: "/",
                templateUrl: "/views/user/index.html",
                controller: "userController"
            }).state("create", {
                url: "/create",
                templateUrl: "/views/user/create.html",
                controller: "userController"
            }).state("edit", {
                url: "/edit/:id",
                templateUrl: "/views/user/create.html",
                controller: "userController"
            }).state("details", {
                url: "/details/:id",
                templateUrl: "/views/user/details.html",
                controller: "userController"
            });
        })
        .constant("globalConfig", {
            userApi: 'http://localhost:4000/api/user/',
            userLoginApi: 'http://localhost:4000/api/user/login'
        }).run(run);

    run.$inject = ['$rootScope','$localStorage'];

    function run($rootScope, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.userData) {
                $rootScope.userLogin = true;
                if($localStorage.userData.role === 'Admin') $rootScope.isAdmin = true;
            }else {
                 $rootScope.userLogin = false;
                 $rootScope.isAdmin = false;
            }
    }
})();
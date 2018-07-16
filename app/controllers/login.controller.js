(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', Controller);

    Controller.$inject = ['$scope', '$rootScope', 'userService', '$state', '$stateParams', '$localStorage'];

    function Controller($scope, $rootScope, userService, $state, $stateParams, $localStorage) {
        $scope.user = {};
        $rootScope.userLogin = false;
        if ($state.current.name === 'login') {
            $scope.login = function() {
                // userService is to get the user data
                userService.Login($scope.user).then(function(res) {
                    if (res.success) {
                        $(".success").removeClass("in").show();
                        $(".success").delay(200).addClass("in").fadeOut(3000);
                        $rootScope.message = res.message;
                        $rootScope.name = res.data.name
                        $rootScope.userLogin = true
                        $localStorage.userData = res.data;
                        if (res.data.role === 'Admin') {
                            $rootScope.isAdmin = true;
                            $state.go("users");
                        }else
                        $state.go("home");
                    } else {
                        $(".error").removeClass("in").show();
                        $(".error").delay(200).addClass("in").fadeOut(3000);
                        $rootScope.message = res.message;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
        }
    }
})();
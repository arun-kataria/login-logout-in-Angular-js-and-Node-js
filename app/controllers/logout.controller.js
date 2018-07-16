(function() {
    'use strict';

    angular
        .module('app')
        .controller('logoutController', Controller);

    Controller.$inject = ['$scope', '$rootScope', 'userService', '$state', '$stateParams', '$localStorage'];

    function Controller($scope, $rootScope, userService, $state, $stateParams, $localStorage) {
        
        if ($localStorage.userData) {
            $localStorage.userData = null;
            $rootScope.userLogin = false;
            $rootScope.isAdmin = false;
            $rootScope.name = '';
            $(".success").removeClass("in").show();
            $(".success").delay(200).addClass("in").fadeOut(3000);
            $rootScope.message = 'Logout';
        }
    }
})();
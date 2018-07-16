(function () {
    'use strict';
 
    angular
        .module('app')
        .service('userService', userService);
 
    userService.$inject = ['$http', 'globalConfig'];
    function userService($http, globalConfig) {
        
        var service = {};
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.Login = Login;
        return service;
 
        function GetAll() {
            return $http.get(globalConfig.userApi).then(handleSuccess, handleError('Error getting all user'));
        }
 
        function GetById(id) {
            return $http.get(globalConfig.userApi + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function Create(user) {
            return $http.post(globalConfig.userApi, user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put(globalConfig.userApi + user._id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete(globalConfig.userApi + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function Login(user) {
            return $http.post(globalConfig.userLoginApi, user).then(handleSuccess, handleError('Error deleting user'));
        }
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();
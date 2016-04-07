angular.module('App.controllers')

.controller('LogoutController', ['$rootScope', '$window', 'UserFactory', function ($rootScope, $window, UserFactory) {
    'use strict';

    var vm = this;

    vm.logout = function () {
        UserFactory.logout().then(function () {
            $rootScope.user = null;
            $window.location.href = '';
        });
    };

}]);
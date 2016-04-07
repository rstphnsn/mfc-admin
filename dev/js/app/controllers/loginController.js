angular.module('App.controllers')

.controller('LoginController', ['$rootScope', '$state', '$window', 'UserFactory', function ($rootScope, $state, $window, UserFactory) {
    'use strict';

    var vm = this,

    handleError = function (response) {
        if (response.statusText === 'Unauthorized') {
            vm.errorMessage = 'Username or password incorrect.';
        } else {
            vm.errorMessage = response.statusText;
        }
    };

    vm.login = function () {
        var loginObj,
            loginForm = $window.document.forms.namedItem('loginForm');
        if (loginForm.username.value !== '' && loginForm.password.value !== '') {
            loginObj = {
                'username': loginForm.username.value,
                'password': loginForm.password.value
            };
            UserFactory.login(loginObj).then(function (response) {
                $rootScope.user = response.data.user;
                $state.go('home');
            }, handleError);
        }
    };

}]);

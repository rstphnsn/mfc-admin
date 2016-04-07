angular.module('App.services')

.factory('AuthInterceptor', function AuthInterceptor (APP, AuthFactory, $rootScope, $q, $window) {
    'use strict';

    var addToken = function (config) {
        var token = AuthFactory.getToken();
        if (config.url.indexOf(APP.SERVICE_URL) !== -1 && token) {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },

    handleResponseError = function (response) {
        if (response.status === 401 || response.status === 403) {
            AuthFactory.setToken();
            $rootScope.user = null;
            if (response.config.url.indexOf('login') === -1) {
                $window.location.href = '';
            }
        }
        return $q.reject(response);
    };

    return {
        request: addToken,
        responseError: handleResponseError
    };

});
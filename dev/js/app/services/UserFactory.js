angular.module('App.services')

.factory('UserFactory', function UserFactory (APP, $http, AuthFactory, $q) {
    'use strict';

    var serviceUrl = APP.SERVICE_URL,

    login = function (loginObj) {
        return $http.post(serviceUrl + 'login', loginObj).then(function (response) {
            AuthFactory.setToken(response.data.token);
            return response;
        });
    },

    logout = function () {
        var deferred = $q.defer();
        deferred.resolve(AuthFactory.setToken());
        return deferred.promise;
    },

    getUser = function () {
        if (AuthFactory.getToken()) {
            return $http.get(serviceUrl + 'me');
        } else {
            return $q.reject({data: 'Client has no auth token'});
        }
    };

    return {
        login: login,
        logout: logout,
        getUser: getUser
    };

});
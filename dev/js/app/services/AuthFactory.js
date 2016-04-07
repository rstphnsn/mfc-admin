angular.module('App.services')

.factory('AuthFactory', function AuthFactory ($window) {
    'use strict';

    var store = $window.localStorage,
        key = 'auth-token',

    getToken = function () {
        return store.getItem(key);
    },

    setToken = function (token) {
        if (token) {
            store.setItem(key, token);
        } else {
            console.log('remove token');
            store.removeItem(key);
        }
    },

    checkAuth = function () {
        if (getToken()) {
            return true;
        }
    };

    return {
        getToken: getToken,
        setToken: setToken,
        checkAuth: checkAuth
    };

});
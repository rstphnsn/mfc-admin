window.app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    'use strict';

    $httpProvider.interceptors.push('AuthInterceptor');

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('login',
        {
            url: '/',
            templateUrl: 'templates/login.html',
            data: {
                requireLogin: false
            }
        }
    )

    .state('home',
        {
            url: '/home',
            templateUrl: 'templates/home.html',
            data: {
                requireLogin: true
            }
        }
    )

    .state('bookings',
        {
            url: '/bookings/:cottage',
            templateUrl: 'templates/bookings.html',
            data: {
                requireLogin: true
            }
        }
    );



}]);

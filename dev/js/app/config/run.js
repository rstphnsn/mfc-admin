window.app.run(['AuthFactory', 'UserFactory', '$state', '$rootScope', function (AuthFactory, UserFactory, $state, $rootScope) {
    'use strict';

    UserFactory.getUser().then(function (response) {
        $rootScope.user = response.data.user;
    });

    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (next.data.requireLogin !== false && $rootScope.user === undefined) {
            if (!AuthFactory.checkAuth()) {
                event.preventDefault();
                $state.go('login');
            }
        }
    });

}]);
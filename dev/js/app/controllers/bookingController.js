angular.module('App.controllers')

.controller('BookingController', ['$state', function ($state) {
    'use strict';

    var vm = this,
        propertyNames = {
            'the_stables': 'The Stables',
            'the_cottage': 'The Cottage'
        };

    vm.title = propertyNames[$state.params.cottage];


}]);

angular.module('App.services')

.factory('BookingFactory', function BookingFactory (APP, $http) {
    'use strict';

    var serviceUrl = APP.SERVICE_URL,

    createBooking = function (dataObj) {
        return $http.post(serviceUrl + 'bookings/', dataObj).then(function (response) {
            return response.data;
        }, function () {
            throw new Error('BookingFactory.createBooking: There was a problem creating booking');
        });
    },

    updateBooking = function (bookingId, dataObj) {
        return $http.put(serviceUrl + 'bookings/' + bookingId, dataObj).then(function (response) {
            return response.data;
        }, function () {
            throw new Error('BookingFactory.updateBooking: There was a problem updating booking ' + bookingId);
        });
    },

    getBooking = function (bookingId) {
        return $http.get(serviceUrl + 'bookings/' + bookingId).then(function (response) {
            return response.data;
        }, function () {
            throw new Error('BookingFactory.getBooking: Unable to get booking object');
        });
    },

    getBookings = function (cottage) {
        return $http.get(serviceUrl + 'cottages/' + cottage + '/bookings').then(function (response) {
            return response.data;
        }, function () {
            throw new Error('BookingFactory.getBookings: There was a problem loading bookings');
        });
    };

    return {
        createBooking: createBooking,
        updateBooking: updateBooking,
        getBooking: getBooking,
        getBookings: getBookings
    };

});

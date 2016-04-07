angular.module('App.directives')

.directive('calendar', function () {
    'use strict';

    var template = function () {

        var numberOfMonths = 12,
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysCalendar = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            daysObj = {
                'Sunday': 1,
                'Monday': 2,
                'Tuesday': 3,
                'Wednesday': 4,
                'Thursday': 5,
                'Friday': 6
            },
            daysInMonthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            months   = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            dt = new Date(),
            month = dt.getMonth(),
            year = dt.getFullYear(),
            table = '',
            saturday,
            startOfBooking,
            endOfBooking,
            daysInMonth,
            daysInCalendar,
            rows,
            count,
            firstDate,
            firstDay;

        // get the current date
        // from there we can determine what month we're in

        // then we can figure out what the first Saturday is and its date.
        // - Get the first day of the current month.
        // - Is it a Saturday? If not, how many days until it is. Use $days array for that calculation.
        // Once we've got that, we can simply loop in batches of 7 (until the end of the month at which point the counter is reset)

        for (var i = 0; i < numberOfMonths; i++) {

            firstDate = new Date(year, month, 1);
            firstDay = days[firstDate.getDay()];

            if (firstDay === 'Saturday') {
                saturday = 1;
            } else {
                saturday = 1 + (days.length - daysObj[firstDay]);
            }

            count = saturday;

            if (year % 4 === 0 && month === 1) {
                daysInMonth = 29;
            } else {
                daysInMonth = daysInMonthsArray[month];
            }

            daysInCalendar = (daysInMonth - (saturday - 1)) > 28 ? 35 : 28;
            rows = daysInCalendar / 7;

            table += '<table>';
            table += '<tr>';
            table += '<th colspan="9">' + months[month] + ' ' + year + '</th>';
            table += '</tr>';

            table += '<tr>';
            for (var j = 0; j < daysCalendar.length; j++) {
                table += '<th>' + daysCalendar[j] + '</th>';
            }
            table += '<th></th>';
            table += '</tr>';
            for (var k = 0; k < rows; k++) {
                table += '<tr>';
                for (var col = 0; col < 8; col++) {
                    var m = (month + 1).toString().length === 1 ? '0' + (month + 1) : month + 1;
                    var d = count.toString().length === 1 ? '0' + count : count;
                    if (!startOfBooking) {
                        startOfBooking = '' + year + m + d;
                    }
                    if (col === 6) {
                        endOfBooking = '' + year + m + d;
                    }
                    if (col === 7) {
                        table += '<td>';
                        table += '<input type="number" min="0" ng-change="calendar.updatePrice(' + startOfBooking + ',' + endOfBooking + ')" ng-model-options="{ updateOn: \'blur\' }" ng-model="calendar.bookingsModel[' + startOfBooking +'].total">';
                        table += '<select ng-disabled="!calendar.bookingsModel[' + startOfBooking +']._id" ng-change="calendar.updateStatus(' + startOfBooking + ')" ng-model="calendar.bookingsModel[' + startOfBooking +'].status">';
                        table += '<option value="open">Open</option>';
                        table += '<option value="booked">Booked</option>';
                        table += '</select>';
                        table += '</td>';
                        startOfBooking = null;
                    } else {
                        table += '<td>' + count++ + '</td>';
                    }
                    if (count > daysInMonth) {
                        count = 1;
                        if (month < 11) {
                            month++;
                        } else {
                            month = 0;
                            year++;
                        }
                    }
                }
                table += '</tr>';
            }
            table += '</table>';
        }
       return table;
    };

    var controller = ['BookingFactory', '$state', function (BookingFactory, $state) {

        var vm = this,
            cottage = $state.params.cottage;
        vm.bookingsModel = [];

        function fred(bookingsObj) {
            var array = [];
            angular.forEach(bookingsObj, function (booking) {
                array[booking.start] = {
                    '_id': booking._id,
                    'cottage': booking.cottage,
                    'start': booking.start,
                    'end': booking.end,
                    'total': parseInt(booking.total, 10),
                    'status': booking.status
                };
            });
            return array;
        }

        BookingFactory.getBookings($state.params.cottage).then(function (response) {
            vm.bookingsModel = fred(response);
        });

        vm.updatePrice = function (startOfBooking, endOfBooking) {
            var bookingObj = vm.bookingsModel[startOfBooking];
            if (bookingObj && bookingObj._id) {
                BookingFactory.updateBooking(bookingObj._id, {'total': bookingObj.total});
            } else if (bookingObj && bookingObj.total) {
                var newBooking = {
                    'cottage': cottage,
                    'start': startOfBooking,
                    'end': endOfBooking,
                    'total': parseInt(bookingObj.total, 10)
                };
                BookingFactory.createBooking(newBooking).then(function (response) {
                    vm.bookingsModel[response.start]._id = response._id;
                });
            }
        };

        vm.updateStatus = function (startOfBooking) {
            var bookingObj = angular.copy(vm.bookingsModel[startOfBooking]);
            if (bookingObj._id) {
                BookingFactory.updateBooking(bookingObj._id, {'status': bookingObj.status});
            }
        };

    }];

    return {
        restrict: 'E',
        controller: controller,
        controllerAs: 'calendar',
        template: template()
    };

});

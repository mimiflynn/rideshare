'use strict';

// TODO: clean up this badboy

angular.module('rideshare.controllers').

    controller('CreateRideshare', ['$scope', '$location', '$routeParams', 'Global', 'Rideshare', function ($scope, $location, $routeParams, Global, Rideshare) {
        $scope.createRideshare = function () {

            if ($scope.timeNotChanged) {
                $scope.timeError = 'Please set time of arrival.';
                $scope.rider = {
                    name: this.rider.name,
                    type: this.rider.type,
                    partyNumber: this.rider.partyNumber,
                    arrivalDate: this.rider.arrivalDate,
                    arrivalTime: this.rider.arrivalTime,
                    arrivalLocation: this.rider.arrivalLocation,
                    notes: this.rider.notes,
                    email: this.rider.email
                };
            } else {

                var rideshare = new Rideshare({
                    name: this.rider.name,
                    type: this.rider.type,
                    partyNumber: this.rider.partyNumber,
                    arrivalDate: this.rider.arrivalDate,
                    arrivalTime: this.rider.arrivalTime,
                    arrivalLocation: this.rider.arrivalLocation,
                    notes: this.rider.notes,
                    email: this.rider.email
                });

                rideshare.$save(function (response) {
                    $location.path('/list');
                });
                this.rider = {};
            }

        };

        $scope.reset = function () {
            $scope.rider = {};
        };

        $scope.update = function () {
            var rideshare = $scope.rideshare;
            if (!rideshare.updated) {
                rideshare.updated = [];
            }
            rideshare.updated.push(new Date().getTime());

            rideshare.$update(function () {
                $location.path('/list');
            });
        };


        $scope.roleSelect = function(open) {
            $event.preventDefault();
            $event.stopPropagation();
            console.log(open);
        };

        /*
         * @ToDo: refactor calendar and date vars into an object for each
         * */

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': 'yy',
            'starting-day': 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];


        /*
         * @ToDo: refactor calendar and date vars into an object for each - does this need to be a service?
         * */

        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.mytime = d;
        };

        $scope.timeNotChanged = true;

        $scope.changeTime = function () {
            $scope.timeNotChanged = false;
        };

        $scope.clear = function () {
            $scope.mytime = null;
        };

    }]);
'use strict';

// TODO: clean up this badboy

angular.module('rideshare.controllers').

    controller('CreateRideshare', ['$scope', '$location', '$routeParams', 'Global', 'Rideshare', function ($scope, $location, $routeParams, Global, Rideshare) {

        $scope.createRideshare = function (rider) {

            rider.car = (rider.role === "Driver") ? rider.name : "Unsorted";

            console.log(rider.car);

            if ($scope.timeNotChanged) {
                $scope.timeError = 'Please set time of arrival.';
                $scope.rider = rider;
            } else {

                var rideshare = new Rideshare(rider);

                rideshare.$save(function (response) {
                    $location.path('/list');
                });

                // is this needed? don't remember why I did this.
                rider = {};
            }

        };

        $scope.reset = function () {
            $scope.rider = {};
        };

        $scope.findOne = function () {
            Rideshare.get({
                rideshareId: $routeParams.rideshareId
            }, function (rideshare) {
                $scope.rider = rideshare;
            });
        };

        $scope.updateRideshare = function () {
            var rider = $scope.rider;

            if (!rider.updated) {
                rider.updated = [];
            }
            rider.updated.push(new Date().getTime());

            rider.$update(function () {
                $location.path('/rideshare/' + $routeParams.rideshareId + '/edit');
                $scope.riderUpdated = "Update Success!";
            });
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

        $scope.clearDate = function () {
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

        $scope.clearTime = function () {
            $scope.mytime = null;
        };

    }]);
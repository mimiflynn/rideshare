'use strict';

angular.module('rideshare.controllers', []).

    controller('SelectRole', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.rider = function () {

            $location.path('/rider');

        };
        $scope.list = function () {

            $location.path('/list');

        };
    }]).

    controller('Display', ['$scope', '$location', '$routeParams', 'Global', 'Rideshare', function ($scope, $location, $routeParams, Global, Rideshare) {
        $scope.global = Global;

        $scope.find = function () {
            Rideshare.query(function (rideshare) {
                $scope.rideshares = rideshare;
            });
        };

        $scope.selectedPeople = [];

        $scope.gridOptions = {
            data: 'rideshares',
//            showGroupPanel: true,
//            jqueryUIDraggable: true,
            selectedItems: $scope.selectedPeople,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field: 'partyNumber', displayName: '# in party'},
                {field: 'arrivalDate', displayName: 'Arrival Date'},
                {field: 'arrivalTime', displayName: 'Arrival Time'},
                {field: 'arrivalLocation', displayName: 'Arrival Location'}
            ]
        };

        $scope.findOne = function () {
            Rideshare.get({
                RideshareId: $routeParams.rideshareId
            }, function (rideshare) {
                $scope.rideshare = rideshare;
            });
        };
    }]).

    controller('Administer', ['$scope', '$location', '$routeParams', 'Global', 'Rideshare', function ($scope, $location, $routeParams, Global, Rideshare) {
        $scope.global = Global;

        $scope.remove = function (rideshare) {
            if (rideshare) {
                rideshare.$remove();

                for (var i in $scope.rideshares) {
                    if ($scope.rideshares[i] === rideshare) {
                        $scope.rideshares.splice(i, 1);
                    }
                }
            }
            else {
                $scope.rideshare.$remove();
                $location.path('rideshares');
            }
        };

        $scope.update = function () {
            var rideshare = $scope.rideshare;
            if (!rideshare.updated) {
                rideshare.updated = [];
            }
            rideshare.updated.push(new Date().getTime());

            rideshare.$update(function () {
                $location.path('rideshares/' + rideshare._id);
            });
        };
    }]).

    controller('CreateRideshare', ['$scope', '$location', '$routeParams', 'Global', 'Rideshare', function ($scope, $location, $routeParams, Global, Rideshare) {
        $scope.createRideshare = function () {
            var rideshare = new Rideshare({
                name: this.name,
                type: this.type,
                partyNumber: this.partyNumber,
                arrivalDate: this.arrivalDate,
                arrivalTime: this.arrivalTime,
                arrivalLocation: this.arrivalLocation,
                notes: this.notes,
                email: this.email
            });
            rideshare.$save(function (response) {
                $location.path('rideshare/' + response._id);
            });

            this.name = '';
            this.type = '';
            this.partyNumber = '';
            this.arrivalDate = '';
            this.arrivalTime = '';
            this.arrivalLocation = '';
            this.notes = '';
            this.email = '';
        };

        $scope.update = function () {
            var rideshare = $scope.rideshare;
            if (!rideshare.updated) {
                rideshare.updated = [];
            }
            rideshare.updated.push(new Date().getTime());

            rideshare.$update(function () {
                $location.path('rideshare/' + rideshare._id);
            });
        };

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

        $scope.clear = function () {
            $scope.mytime = null;
        };

    }]);
'use strict';

angular.module('rideshare.controllers').

    controller('List', ['$scope', '$location', '$routeParams', '$window', 'Global', 'Rideshare', 'BrowserDetect', function ($scope, $location, $routeParams, $window, Global, Rideshare, BrowserDetect) {
        $scope.global = Global;

        $scope.isDesktop = function () {
            return BrowserDetect.width >= 768;
        };

        $scope.find = function () {
            Rideshare.query(function (rideshare) {
                $scope.rideshares = rideshare;
            });
        };

        $scope.selectedPeople = [];

        $scope.selectedFilter = '';

        // grid view of all participants
        $scope.gridOptions = {
            data: 'rideshares',
            selectedItems: $scope.selectedPeople,
            columnDefs: [
                {field: 'car', displayName: 'Car'},
                {field: 'name', displayName: 'Name'},
                {field: 'role', displayName: 'Role'},
                {field: 'partyNumber', displayName: '# in party'},
                {field: 'arrivalDate', displayName: 'Arrival Date', cellFilter: 'date : \'MMMM dd\''},
                {field: 'arrivalTime', displayName: 'Arrival Time', cellFilter: 'date : \'h:mm a\''},
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

        // admin huzzah stuff

        $scope.remove = function (rideshare) {

            $scope.rideshare = rideshare;

            if (rideshare) {
                rideshare.$remove();

// @Todo refactor with lodash

                // remove selected from the main collection
                for (var i in $scope.rideshares) {
                    if ($scope.rideshares[i] === rideshare) {
                        $scope.rideshares.splice(i, 1);
                    }
                }

                // remove selected from the group of displayed people
                for (var i in $scope.selectedPeople) {
                    if ($scope.selectedPeople[i] === rideshare) {
                        $scope.selectedPeople.splice(i, 1);
                    }
                }
                $location.path('/huzzah');
            }
            else {
                $scope.rideshare.$remove();
                $location.path('/huzzah');
            }
        };
    }]);
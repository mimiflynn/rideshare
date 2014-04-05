'use strict';

angular.module('rideshare.controllers', []).

    controller('SelectRole', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.rider = function () {

            console.log('Rider Selected');
            $location.path('/rider');

        };
        $scope.driver = function () {

            console.log('Driver Selected');
            $location.path('/driver');

        };
    }]).
    controller('Rider', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        
    }]).
    controller('Driver', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        
    }]);

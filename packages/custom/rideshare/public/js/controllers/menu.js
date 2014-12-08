'use strict';

angular.module('rideshare.controllers').

    controller('Menu', ['$scope', '$location', function ($scope, $location) {
        $scope.rider = function () {
            $location.path('/rider');
        };
        $scope.list = function () {
            $location.path('/list');
        };
    }]);
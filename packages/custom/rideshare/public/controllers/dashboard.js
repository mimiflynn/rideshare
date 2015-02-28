'use strict';

angular.module('mean.rideshare')
  .controller('Dashboard', ['$scope', 'LoggedIn', 'Statics',
    function ($scope, LoggedIn, Statics) {

      var isLoggedIn = function () {
        LoggedIn.then(function (status) {
          $scope.isLoggedIn = status;
        });
      };

      $scope.package = Statics;

      $scope.init = function () {
        isLoggedIn();
      };

    }]);
'use strict';

angular.module('mean.rideshare')
  .controller('Dashboard', ['$scope', 'LoggedIn', 'Statics',
    function ($scope, LoggedIn, Statics) {

      var isLoggedIn = function () {
        LoggedIn.get(function (user) {
          $scope.isLoggedIn = (user[0] !== 0) ? true : false;
        });
      };

      $scope.package = Statics;

      $scope.init = function () {
        isLoggedIn();
      };

    }]);
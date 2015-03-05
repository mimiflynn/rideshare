'use strict';

angular.module('mean.rideshare')
  .controller('Dashboard', ['$scope', 'LoggedIn', 'Statics', 'UsersExtended',
    function ($scope, LoggedIn, Statics, UsersExtended) {

      var isLoggedIn = function () {
        LoggedIn.then(function (status) {
          $scope.isLoggedIn = status;
        });
      };

      var getUser = function () {
        // get user info and fill in associated info for rider
        UsersExtended.get(function (user) {
          $scope.user = {
            name: user.name
          };
        });
      };

      $scope.package = Statics;

      $scope.init = function () {
        isLoggedIn();
        getUser();
      };

    }]);
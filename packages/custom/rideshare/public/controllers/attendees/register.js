'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('CreateRideshare', ['$scope', '$location', '$stateParams', 'Rideshare', 'UsersExtended',
    function ($scope, $location, $stateParams, Rideshare, UsersExtended) {
      $scope.package = ridesharePackage;

      // get user info and fill in associated info for rider
      $scope.getUser = function () {
        UsersExtended.get(function (user) {
          $scope.rider = {
            name: user.name,
            email: user.email
          };
        });
      };

      $scope.findOne = function () {
        Rideshare.get({
          rideshareId: $stateParams.rideshareId
        }, function(rideshare) {
          $scope.rider = rideshare;
        });
      };

      $scope.createRideshare = function (isValid) {
        var rider = this.rider;

        if (isValid) {
          var rideshare = new Rideshare(rider);
          rideshare.$save(function () {
            $location.path('/rideshare/list');
          });
          this.rider = {};
        } else {
          $scope.submitted = true;
        }
      };

      $scope.reset = function () {
          $scope.rider = {};
      };

      $scope.updateRideshare = function (isValid) {
        if (isValid) {
          var rideshare = $scope.rider;
          if (!rideshare.updated) {
            rideshare.updated = [];
          }
          rideshare.updated.push(new Date().getTime());

          rideshare.$update(function() {
            $location.path('rideshare/list');
          });
        } else {
          $scope.submitted = true;
        }
      };

  }]);

'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('RegisterAttendee', ['$scope', '$location', '$stateParams', 'Attendee', 'UsersExtended',
    function ($scope, $location, $stateParams, Attendee, UsersExtended) {
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
        Attendee.get({
          attendeeId: $stateParams.attendeeId
        }, function(attendee) {
          $scope.rider = attendee;
        });
      };

      $scope.createAttendee = function (isValid) {
        var rider = this.rider;

        if (isValid) {
          var attendee = new Attendee(rider);
          attendee.$save(function () {
            $location.path('/attendee/list');
          });
          this.rider = {};
        } else {
          $scope.submitted = true;
        }
      };

      $scope.reset = function () {
          $scope.rider = {};
      };

      $scope.updateAttendee = function (isValid) {
        if (isValid) {
          var attendee = $scope.rider;
          if (!attendee.updated) {
            attendee.updated = [];
          }
          attendee.updated.push(new Date().getTime());

          attendee.$update(function() {
            $location.path('attendee/list');
          });
        } else {
          $scope.submitted = true;
        }
      };

  }]);

'use strict';

angular.module('mean.rideshare')
  .controller('RegisterAttendee', ['$scope', '$location', '$stateParams', 'Attendee', 'UsersExtended', 'Event', 'Statics',
    function ($scope, $location, $stateParams, Attendee, UsersExtended, Event, Statics) {
      $scope.package = Statics;

      var reset = function () {
        // get user info and fill in associated info for rider
        UsersExtended.get(function (user) {
          $scope.rider = {
            name: user.name,
            email: user.email
          };
        });
      };

      var getEvents = function () {
        Event.query(function (events) {
            $scope.events = events;
        });
      };

      $scope.submitted = false;

      $scope.init = function () {
        reset();
        getEvents();
      };

      $scope.findOne = function () {
        Attendee.get({
          attendeeId: $stateParams.attendeeId
        }, function(attendee) {
          $scope.rider = attendee;
        });
      };

      $scope.createAttendee = function () {
        var rider = this.rider;

        if (this.signupForm.$isValid) {
          var attendee = new Attendee(rider);
          attendee.$save(function () {
            $location.path('/attendee/list');
          });
          this.rider = {};
        } else {
          $scope.submitted = true;
        }
      };

      $scope.updateAttendee = function () {
        if (this.signupForm.$isValid) {
          var attendee = $scope.rider;
          if (!attendee.updated) {
            attendee.updated = [];
          }
          attendee.updated.push(new Date().getTime());

          attendee.$update(function() {
            $location.path('/attendee/list');
          });
        } else {
          $scope.submitted = true;
        }
      };

  }]);

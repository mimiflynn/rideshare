'use strict';

angular.module('mean.rideshare')
  .controller('CreateEvent', ['$scope', '$location', '$stateParams', '$window', 'Event', 'UsersExtended', 'Statics',
    function ($scope, $location, $stateParams, $window, Event, UsersExtended, Statics) {
      $scope.package = Statics;

      $scope.submitted = false;

      // get user info assign as event organizer
      $scope.getUser = function () {
        UsersExtended.get(function (user) {
          $scope.rsEvent = {
            organizerId: user._id
          };
        });
      };

      $scope.createEvent = function () {
        if (this.eventForm.$isValid) {
          console.log('sent! and is valid');
          var rsEvent = new Event(this.rsEvent);
          rsEvent.$save(function () {
            $location.path('/rideshare/admin');
          });
          this.rsEvent = {};
        } else {
          $scope.submitted = true;
        }
      };

      $scope.reset = function () {
          $scope.getUser();
      };

      $scope.updateEvent = function () {
        if (this.eventForm.$isValid) {
          var rsEvent = $scope.rsEvent;
          if (!rsEvent.updated) {
            rsEvent.updated = [];
          }
          rsEvent.updated.push(new Date().getTime());

          rsEvent.$update(function() {
            $location.path('rideshare/admin');
          });
        } else {
          $scope.submitted = true;
        }
      };
}]);
'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('CreateEvent', ['$scope', '$location', '$stateParams', '$window', 'Event', 'UsersExtended',
    function ($scope, $location, $stateParams, $window, Event, UsersExtended) {
      $scope.package = ridesharePackage;

      // get user info assign as event creator
      $scope.getUser = function () {
        UsersExtended.get(function (user) {
          console.log(user);
          $scope.rsEvent = {
            organizer: user._id
          };
        });
      };

      $scope.createEvent = function (isValid) {
        if (isValid) {
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
          $scope.rider = {};
      };

      $scope.updateEvent = function (isValid) {
        if (isValid) {
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
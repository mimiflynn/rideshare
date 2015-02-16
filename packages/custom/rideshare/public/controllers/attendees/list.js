'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('ListAttendees', ['$scope', '$location', '$stateParams', '$window', 'Attendee', 'BrowserDetect',
    function ($scope, $location, $stateParams, $window, Attendee, BrowserDetect) {
      $scope.package = ridesharePackage;

      $scope.isDesktop = function () {
          return BrowserDetect.width >= 768;
      };

      $scope.find = function () {
          Attendee.query(function (attendee) {
              $scope.attendees = attendee;
          });
      };

      $scope.selectedPeople = [];

      $scope.selectedFilter = '';

      // grid view of all participants
      $scope.gridOptions = {
        data: 'attendees',
        selectedItems: $scope.selectedPeople,
        columnDefs: [
          {field: 'car', displayName: 'Car'},
          {field: 'name', displayName: 'Name'},
          {field: 'role', displayName: 'Role'},
          {field: 'partyNumber', displayName: '# in party'},
          {field: 'arrivalDate', displayName: 'Arrival Date', cellFilter: 'date : \'MMMM dd\''},
          {field: 'arrivalTime', displayName: 'Arrival Time', cellFilter: 'date : \'h:mm a\''},
          {field: 'arrivalLocation', displayName: 'Arrival Location'}
        ]
      };

      $scope.remove = function (attendee) {
        $scope.attendee = attendee;

        if (attendee) {
          attendee.$remove(function(response) {
            // remove selected from the main collection displayed in grid
            $scope.attendees.forEach(function(person, i) {
              if (person === attendee) {
                $scope.attendees.splice(i, 1);
              }
            });
            // remove selected from the group of displayed people
            $scope.selectedPeople.forEach(function(person, i) {
              if (person === attendee) {
                $scope.selectedPeople.splice(i, 1);
              }
            });
          });
        } else {
          $scope.attendee.$remove();
        }
      };

      $scope.update = function (isValid) {
        if (isValid) {
          var attendee = $scope.attendee;
          if (!attendee.updated) {
              attendee.updated = [];
          }
          attendee.updated.push(new Date().getTime());

          attendee.$update(function () {
            $location.path('attendee/' + attendee._id);
          });
        } else {
          $scope.submitted = true;
        }
      };
  }]);
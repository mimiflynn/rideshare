'use strict';

angular.module('mean.rideshare')
  .controller('EventAdmin', ['$scope', '$location', '$stateParams', '$window', 'BrowserDetect', 'Event', 'Statics',
    function ($scope, $location, $stateParams, $window, BrowserDetect, Event, Statics) {
      $scope.package = Statics;

      $scope.isDesktop = function () {
          return BrowserDetect.width >= 768;
      };

      $scope.find = function () {
          Event.query(function (events) {
              $scope.events = events;
          });
      };

      $scope.selectedEvents = [];

      $scope.selectedFilter = '';

      // grid view of all participants
      $scope.gridOptions = {
        data: 'events',
        selectedItems: $scope.selectedEvents,
        columnDefs: [
          {field: 'name', displayName: 'Name'},
          {field: 'organizer', displayName: 'Organizer'},
          {field: 'date', displayName: 'Date', cellFilter: 'date : \'MMMM dd\''}
        ]
      };

      $scope.remove = function (rsEvent) {
        $scope.rsEvent = rsEvent;

        if (rsEvent) {
          rsEvent.$remove(function(response) {
            // remove selected from the main collection displayed in grid
            $scope.events.forEach(function(item, i) {
              if (item === rsEvent) {
                $scope.events.splice(i, 1);
              }
            });
            // remove selected from the group of displayed people
            $scope.selectedPeople.forEach(function(item, i) {
              if (item === rsEvent) {
                $scope.selectedEvents.splice(i, 1);
              }
            });
          });
        } else {
          $scope.rsEvent.$remove();
        }
      };

      $scope.update = function (isValid) {
        if (isValid) {
          var rsEvent = $scope.rsEvent;
          if (!rsEvent.updated) {
              rsEvent.updated = [];
          }
          rsEvent.updated.push(new Date().getTime());

          rsEvent.$update(function () {
            $location.path('event/' + rsEvent._id);
          });
        } else {
          $scope.submitted = true;
        }
      };
  }]);
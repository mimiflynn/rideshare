'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('RideshareList', ['$scope', '$location', '$stateParams', '$window', 'Rideshare', 'BrowserDetect',
    function ($scope, $location, $stateParams, $window, Rideshare, BrowserDetect) {
      $scope.package = ridesharePackage;

      $scope.isDesktop = function () {
          return BrowserDetect.width >= 768;
      };

      $scope.find = function () {
          Rideshare.query(function (rideshare) {
              $scope.rideshares = rideshare;
          });
      };

      $scope.selectedPeople = [];

      $scope.selectedFilter = '';

      // grid view of all participants
      $scope.gridOptions = {
        data: 'rideshares',
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

      $scope.remove = function (rideshare) {
        $scope.rideshare = rideshare;

        if (rideshare) {
          rideshare.$remove(function(response) {
            // remove selected from the main collection displayed in grid
            $scope.rideshares.forEach(function(person, i) {
              if (person === rideshare) {
                $scope.rideshares.splice(i, 1);
              }
            });
            // remove selected from the group of displayed people
            $scope.selectedPeople.forEach(function(person, i) {
              if (person === rideshare) {
                $scope.selectedPeople.splice(i, 1);
              }
            });
          });
        } else {
          $scope.rideshare.$remove();
        }
      };

      $scope.update = function (isValid) {
        if (isValid) {
          var rideshare = $scope.rideshare;
          if (!rideshare.updated) {
              rideshare.updated = [];
          }
          rideshare.updated.push(new Date().getTime());

          rideshare.$update(function () {
            $location.path('rideshare/' + rideshare._id);
          });
        } else {
          $scope.submitted = true;
        }
      };
  }]);
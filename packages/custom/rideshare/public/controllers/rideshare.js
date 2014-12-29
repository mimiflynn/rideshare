'use strict';

angular.module('mean.rideshare')
  .controller('RideshareList', ['$scope', '$location', '$stateParams', '$window', 'Global', 'Rideshare', 'BrowserDetect',
    function ($scope, $location, $stateParams, $window, Global, Rideshare, BrowserDetect) {
      $scope.global = Global;
      $scope.package = {
        name: 'rideshare',
        assets: 'packages/custom/rideshare/public/assets'
      };

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

      $scope.findOne = function () {
        Rideshare.get({
          RideshareId: $stateParams.rideshareId
        }, function (rideshare) {
          $scope.rideshare = rideshare;
        });
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
  }])

  .controller('CreateRideshare', ['$scope', '$location', '$stateParams', 'Global', 'Rideshare',
    function ($scope, $location, $stateParams, Global, Rideshare) {
      $scope.global = Global;
      $scope.package = {
        name: 'rideshare',
        assets: 'packages/custom/rideshare/public/assets'
      };

      $scope.findOne = function () {
        Rideshare.get({
          RideshareId: $stateParams.rideshareId
        }, function (rideshare) {
          $scope.rideshare = rideshare;
        });
      };

      $scope.createRideshare = function () {

        if ($scope.timeNotChanged) {
          $scope.timeError = 'Please set time of arrival.';
          $scope.rider = {
            name: this.rider.name,
            type: this.rider.type,
            partyNumber: this.rider.partyNumber,
            arrivalDate: this.rider.arrivalDate,
            arrivalTime: this.rider.arrivalTime,
            arrivalLocation: this.rider.arrivalLocation,
            notes: this.rider.notes,
            email: this.rider.email
          };
        } else {
          var rideshare = new Rideshare({
            name: this.rider.name,
            type: this.rider.type,
            partyNumber: this.rider.partyNumber,
            arrivalDate: this.rider.arrivalDate,
            arrivalTime: this.rider.arrivalTime,
            arrivalLocation: this.rider.arrivalLocation,
            notes: this.rider.notes,
            email: this.rider.email
          });
          
          rideshare.$save(function () {
            // send to list after saving
            $location.path('/rideshare/list');
          });
          
          this.rider = {};
        }

      };

      $scope.reset = function () {
          $scope.rider = {};
      };

      $scope.update = function () {
          var rideshare = $scope.rideshare;
          if (!rideshare.updated) {
              rideshare.updated = [];
          }
          rideshare.updated.push(new Date().getTime());

          rideshare.$update(function () {
            // @todo refactor to use state name
              $location.path('/list');
          });
      };


      /*
       * @ToDo: refactor calendar and date whatnot into components
       * */

      $scope.today = function () {
          $scope.dt = new Date();
      };
      $scope.today();

      $scope.showWeeks = true;
      $scope.toggleWeeks = function () {
          $scope.showWeeks = !$scope.showWeeks;
      };

      $scope.clear = function () {
          $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function (date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function () {
          $scope.minDate = ( $scope.minDate ) ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
      };

      $scope.dateOptions = {
          'year-format': 'yy',
          'starting-day': 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];


      /*
       * @ToDo: refactor calendar and date vars into an object for each
       * */

      $scope.mytime = new Date();

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
          hstep: [1, 2, 3],
          mstep: [1, 5, 10, 15, 25, 30]
      };

      $scope.ismeridian = true;
      $scope.toggleMode = function () {
          $scope.ismeridian = !$scope.ismeridian;
      };

      $scope.update = function () {
          var d = new Date();
          d.setHours(14);
          d.setMinutes(0);
          $scope.mytime = d;
      };

      $scope.timeNotChanged = true;

      $scope.changeTime = function () {
          $scope.timeNotChanged = false;
      };

      $scope.clear = function () {
          $scope.mytime = null;
      };

  }]);

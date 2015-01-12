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
          }
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

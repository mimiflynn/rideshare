'use strict';

angular.module('mean.rideshare')
  .controller('Date', ['$scope',
    function ($scope) {
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

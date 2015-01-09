'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('RideshareEvent', ['$scope', '$location', '$stateParams', '$window', 'Rideshare', 'BrowserDetect',
    function ($scope, $location, $stateParams, $window, Rideshare, BrowserDetect) {
      $scope.package = ridesharePackage;

}]);
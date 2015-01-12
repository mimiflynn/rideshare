'use strict';

var ridesharePackage = {
  name: 'rideshare',
  assets: 'packages/custom/rideshare/public/assets'
};

angular.module('mean.rideshare')
  .controller('CreateEvent', ['$scope', '$location', '$stateParams', '$window', 'Rideshare', 'UsersExtended',
    function ($scope, $location, $stateParams, $window, Rideshare, UsersExtended) {
      $scope.package = ridesharePackage;

      // get user info assign as event creator
      $scope.getUser = function () {
        UsersExtended.get(function (user) {
          $scope.event = {
            organizer: user
          };
        });
      };


}]);
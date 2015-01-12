'use strict';

angular.module('mean.users-extended').controller('UsersExtendedController', ['$scope', 'Global', 'UsersExtended',
  function($scope, Global, UsersExtended) {
    $scope.global = Global;
    $scope.package = {
      name: 'users-extended'
    };

    $scope.getUser = function () {
      UsersExtended.get(function (user) {
        $scope.user = user;
      });
    };

  }]);

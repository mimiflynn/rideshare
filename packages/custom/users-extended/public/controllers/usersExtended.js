'use strict';

angular.module('mean.users-extended').controller('UsersExtendedController', ['$scope', 'Global', 'UsersExtended', 'MeanUser',
  function($scope, Global, UsersExtended, MeanUser) {
    $scope.global = Global;
    $scope.package = {
      name: 'users-extended'
    };

    $scope.getUser = function () {
      UsersExtended.get(function (user) {
        $scope.user = user;

        console.log('user: ', $scope.user);
      });
    };

  }]);

'use strict';

angular.module('mean.users-extended').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('usersExtended example page', {
      url: '/user/profile',
      templateUrl: 'users-extended/views/index.html'
    });
  }
]);

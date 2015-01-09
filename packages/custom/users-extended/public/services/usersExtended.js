'use strict';

angular.module('mean.users-extended')
  .factory('UsersExtended', ['$resource', function ($resource) {
    return $resource('users/me');
}]);

'use strict';

angular.module('mean.users-extended')
  .factory('UsersExtended', ['$resource', function ($resource) {
    // return current user
    return $resource('users/me');
  }])
  .factory('LoggedIn', ['$resource', function ($resource) {
    // Check if the user is connected
    return $resource('loggedin');
  }]);
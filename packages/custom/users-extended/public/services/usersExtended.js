'use strict';

angular.module('mean.users-extended')
  .factory('UsersExtended', ['$resource', function ($resource) {
    // return current user
    return $resource('users/me');
  }])
  .factory('LoggedIn', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    // Check if the user is connected
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function (user) {
      // Authenticated
      if (user !== '0') {
        $timeout(deferred.resolve(true));
      } else {
        // Not Authenticated
        $timeout(deferred.reject(false));
      }
    });

    return deferred.promise;
  }]);
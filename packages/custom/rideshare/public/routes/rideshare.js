'use strict';

angular.module('mean.rideshare').config(['$stateProvider',
  function($stateProvider) {
    // from articles package
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };


    $stateProvider
      .state('rideshares', {
          url: '/rideshare',
          templateUrl: 'rideshare/views/index.html'
        })
        .state('list rideshares', {
          url: '/rideshare/list',
          templateUrl: 'rideshare/views/list.html',
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .state('rideshare signup', {
          url: '/rideshare/signup',
          templateUrl: 'rideshare/views/signup.html'
        })
        .state('rideshare admin', {
          url: '/rideshare/admin',
          templateUrl: 'rideshare/views/admin.html',
          resolve: {
            loggedin: checkLoggedin
          }
        })
        .state('edit rideshare', {
          url: '/rideshare/:rideshareId/edit',
          templateUrl: 'rideshare/views/edit.html',
          resolve: {
            loggedin: checkLoggedin
          }
        });
  }
]);

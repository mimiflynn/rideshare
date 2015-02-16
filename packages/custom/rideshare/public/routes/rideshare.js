'use strict';

angular.module('mean.rideshare')
  .config(['$stateProvider',
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
          .state('list attendees', {
            url: '/rideshare/attendee/list',
            templateUrl: 'rideshare/views/list.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'ListAttendees'
          })
          .state('attendee signup', {
            url: '/rideshare/attendee/signup',
            templateUrl: 'rideshare/views/signup.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'RegisterAttendee'
          })
          .state('edit rideshare', {
            url: '/rideshare/attendee/:rideshareId/edit',
            templateUrl: 'rideshare/views/edit.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'RegisterAttendee'
          })
          .state('rideshare admin', {
            url: '/rideshare/admin',
            templateUrl: 'rideshare/views/admin.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'ListAttendees'
          })
          .state('create event', {
            url: '/rideshare/event/create',
            templateUrl: 'rideshare/views/event.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'CreateEvent'
          })
          .state('edit event', {
            url: '/rideshare/event/edit',
            templateUrl: 'rideshare/views/event.html',
            resolve: {
              loggedin: checkLoggedin
            },
            controller: 'CreateEvent'
          });
    }
  ]);

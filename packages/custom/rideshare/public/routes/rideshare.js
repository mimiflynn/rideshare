'use strict';

angular.module('mean.rideshare')
  .config(['$stateProvider',
    function ($stateProvider) {
      // from articles package
      // Check if the user is connected
      var checkLoggedin = function ($q, $timeout, $http, $location) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function (user) {
          // Authenticated
          if (user !== '0') {
            $timeout(deferred.resolve);
          } else {
            // Not Authenticated
            $timeout(deferred.reject);
            $location.url('/login');
          }
        });

        return deferred.promise;
      };

      $stateProvider
        .state('rideshares', {
          url: '/rideshare',
          templateUrl: 'rideshare/views/index.html',
          controller: 'Dashboard'
        })
        .state('list attendees', {
          url: '/rideshare/attendee/list',
          templateUrl: 'rideshare/views/attendee/list.html',
          resolve: {
            loggedin: checkLoggedin
          },
          controller: 'ListAttendees'
        })
        .state('attendee signup', {
          url: '/rideshare/attendee/signup',
          templateUrl: 'rideshare/views/attendee/signup.html',
          resolve: {
            loggedin: checkLoggedin
          },
          controller: 'RegisterAttendee'
        })
        .state('edit rideshare', {
          url: '/rideshare/attendee/:attendeeId/edit',
          templateUrl: 'rideshare/views/attendee/edit.html',
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
          templateUrl: 'rideshare/views/event/create.html',
          resolve: {
            loggedin: checkLoggedin
          },
          controller: 'CreateEvent'
        })
        .state('event details', {
          url: '/rideshare/event/:eventId',
          templateUrl: 'rideshare/views/event/details.html',
          resolve: {
            loggedin: checkLoggedin
          },
          controller: 'CreateEvent'
        })
        .state('edit event', {
          url: '/rideshare/event/:eventId/edit',
          templateUrl: 'rideshare/views/event/edit.html',
          resolve: {
            loggedin: checkLoggedin
          },
          controller: 'CreateEvent'
        });
    }]);

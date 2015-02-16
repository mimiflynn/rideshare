'use strict';

angular.module('mean.rideshare')
  .factory('Attendee', ['$resource', function ($resource) {
    return $resource('attendee/:attendeeId', {
      rideshareId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }]);

'use strict';

angular.module('mean.rideshare')
  .factory('Event', ['$resource', function ($resource) {
    return $resource('event/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
}]);

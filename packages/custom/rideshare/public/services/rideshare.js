'use strict';

angular.module('mean.rideshare')
  .factory('Rideshare', ['$resource', function ($resource) {
    return $resource('rideshare/:rideshareId', {
      rideshareId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }]);

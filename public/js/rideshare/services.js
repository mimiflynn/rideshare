'use strict';

//Articles service used for articles REST endpoint
angular.module('rideshare.services', []).
    factory('Rideshare', ['$resource', function ($resource) {
        return $resource('rideshare/:rideshareId', {
            rideshareId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
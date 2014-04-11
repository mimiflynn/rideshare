'use strict';

angular.module('rideshare.services', []).
    factory('Rideshare', ['$resource', function ($resource) {
        return $resource('rideshare/:rideshareId', {
            rideshareId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('checkWidth', function ($location, $window) {
        return function () {
            if ($window.document.width < 768) {
                return false;
            } else {
                return true;
            }
        };
    });
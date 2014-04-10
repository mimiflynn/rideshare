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
            if ($window.document.width < 700) {
                console.log('this is a small window size');
            }
        };
    });
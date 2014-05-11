'use strict';

angular.module('rideshare.services').
    factory('Rideshare', ['$resource', function ($resource) {
        return $resource('rideshare/:rideshareId', {
            rideshareId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('BrowserDetect', ['$window', function (win) {

        // TODO: Refactor to not be jQuery
        BrowserDetect.width = $(window).width();

        return BrowserDetect;
    }]);
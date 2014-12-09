'use strict';

angular.module('mean.rideshare', [])
  .constant('angularMomentConfig', {
    timezone: 'America/Denver' // e.g. 'Europe/London'
  })
  .config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

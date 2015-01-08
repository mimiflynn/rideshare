'use strict';

angular.module('mean.rideshare')
  .constant('angularMomentConfig', {
    timezone: 'America/Denver' // e.g. 'Europe/London'
  })
  .config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.hashPrefix('!');
  }])
  // set rideshare index.html as main page
  .config(['$viewPathProvider',
    function($viewPathProvider) {
      $viewPathProvider.override('system/views/index.html', 'rideshare/views/index.html');
  }]);

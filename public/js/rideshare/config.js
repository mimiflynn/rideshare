'use strict';

//Setting up route
angular.module('rideshare').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/rideshare/select.html'
            }).
            when('/rider', {
                templateUrl: 'views/rideshare/signup.html'
            }).
            when('/list', {
                templateUrl: 'views/rideshare/list.html'
            }).
            when('/huzzah', {
                templateUrl: 'views/rideshare/admin.html'
            }).

            // default
            otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('rideshare').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.module('rideshare').constant('angularMomentConfig', {
    timezone: 'America/Denver' // e.g. 'Europe/London'
});
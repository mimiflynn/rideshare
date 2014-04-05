'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).

        // rideshare
        when('/selectRole', {
            templateUrl: 'views/rideshare/select.html'
        }).
        when('/rider', {
            templateUrl: 'views/rideshare/rider.html'
        }).
        when('/driver', {
            templateUrl: 'views/rideshare/driver.html'
        }).

        // default
        otherwise({
            redirectTo: '/selectRole'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
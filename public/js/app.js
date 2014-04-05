'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ui.route',
    'mean.system',
    'mean.articles',
    'rideshare.controllers',
    'rideshare.services'
    ]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
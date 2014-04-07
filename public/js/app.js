'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngGrid',
    'ui.bootstrap',
    'ui.route',
    'mean.system',
    'mean.articles',
    'rideshare.controllers',
    'rideshare.services'
    ]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
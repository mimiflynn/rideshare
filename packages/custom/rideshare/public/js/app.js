'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngGrid',
    'angularMoment',
    'ui.bootstrap',
    'ui.route',
    'mean.system',
    'mean.articles',
    'rideshare',
    'rideshare.controllers',
    'rideshare.services'
]);
angular.module('mean.system', []);
angular.module('mean.articles', []);

angular.module('rideshare',[]);
angular.module('rideshare.controllers',[]);
angular.module('rideshare.services',[]);
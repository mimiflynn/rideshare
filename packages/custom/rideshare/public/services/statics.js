'use strict';

angular.module('mean.rideshare')
  .factory('Statics', [function () {
    return {
      name: 'rideshare',
      assets: '/rideshare/assets'
    };
}]);

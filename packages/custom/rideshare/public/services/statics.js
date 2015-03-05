'use strict';

angular.module('mean.rideshare')
  .factory('Statics', [function () {
    return {
      name: 'rideshare',
      assets: '/rideshare/assets',
      dateOptions: {
        'year-format': 'yy',
        'starting-day': 1
      },
      dateFormats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'],
      wysiwygMenu : [
        ['bold', 'italic'],
        ['font-size'],
        ['remove-format'],
        ['ordered-list', 'unordered-list'],
        ['left-justify', 'center-justify', 'right-justify'],
        ['quote'],
        ['link', 'image']
      ]
    };
  }]);

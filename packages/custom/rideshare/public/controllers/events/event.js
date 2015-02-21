'use strict';

angular.module('mean.rideshare')
  .controller('CreateEvent', ['$scope', '$location', 'Event', 'UsersExtended', 'Statics',
    function ($scope, $location, Event, UsersExtended, Statics) {
      
      // get user info assign as event organizer
      var getUser = function () {
        UsersExtended.get(function (user) {
          $scope.rsEvent = {
            organizerId: user._id
          };
        });
      };

      $scope.package = Statics;

      $scope.submitted = false;

      $scope.wysiwygMenu = [
        ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
        ['font'],
        ['font-size'],
        ['font-color', 'hilite-color'],
        ['remove-format'],
        ['ordered-list', 'unordered-list', 'outdent', 'indent'],
        ['left-justify', 'center-justify', 'right-justify'],
        ['code', 'quote', 'paragragh'],
        ['link', 'image']
      ];

      $scope.createEvent = function () {
        if (this.eventForm.$isValid) {
          var rsEvent = new Event(this.rsEvent);
          rsEvent.$save(function () {
            $location.path('/rideshare/admin');
          });
          this.rsEvent = {};
        } else {
          $scope.submitted = true;
        }
      };

      $scope.resetForm = function () {
          getUser();
      };

      $scope.updateEvent = function () {
        if (this.eventForm.$isValid) {
          var rsEvent = $scope.rsEvent;
          if (!rsEvent.updated) {
            rsEvent.updated = [];
          }
          rsEvent.updated.push(new Date().getTime());

          rsEvent.$update(function () {
            $location.path('rideshare/admin');
          });
        } else {
          $scope.submitted = true;
        }
      };
}]);
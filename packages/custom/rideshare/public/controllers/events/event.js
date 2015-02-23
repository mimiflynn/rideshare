'use strict';

angular.module('mean.rideshare')
  .controller('CreateEvent', ['$scope', '$location', 'Event', 'UsersExtended', 'Statics',
    function ($scope, $location, Event, UsersExtended, Statics) {

      // get user info assign as event organizer
      var getUser = function () {
        UsersExtended.get(function (user) {
          $scope.rsEvent.organizerId = user._id;
        });
      };

      var isDuplicate = function (item, array) {
        var i;
        var l = array.length;
        for (i = 0; i < l; i++) {
          if (array[i] === item) {
            return true;
          }
        }
        return false;
      };

      $scope.package = Statics;
      $scope.submitted = false;
      $scope.rsEvent = {};
      $scope.rsEvent.invitees = [];
      $scope.invitee = '';

      $scope.wysiwygMenu = [
        ['bold', 'italic'],
        ['font-size'],
        ['remove-format'],
        ['ordered-list', 'unordered-list'],
        ['left-justify', 'center-justify', 'right-justify'],
        ['quote'],
        ['link', 'image']
      ];

      $scope.init = function () {
        getUser();
      };

/*      $scope.invitee = '';

      // watch invitee and see if they are already signed up for rideshare
      $scope.$watch('invitee', function (invitee, oldInvitee) {
        console.log('old invitee: ', oldInvitee);
        console.log('new invitee: ', invitee);
        if (invitee !== oldInvitee) {
          UsersExtended.get({
            email: invitee
          }, function (user) {
            console.log('invited user is: ', user);
            $scope.rsEvent.invitees.push(user._id);
          });
        }
      });
*/

      $scope.addInvitee = function () {
        var invitee = $scope.invitee.slice(0);
        // check to be sure email is not already in the array
        if (this.eventForm.invitee.$valid) {
          if (!isDuplicate(invitee, $scope.rsEvent.invitees)) {
            $scope.rsEvent.invitees.push(invitee);
            $scope.invitee = '';
          } else {
            $scope.inviteeError = 'This person has already been invited.';
          }
        } else {
          $scope.inviteeError = 'Must be a valid email address.';
        }
      };

      $scope.createEvent = function () {
        console.log('attempting to submit');
        if (this.eventForm.$valid) {
          console.log('submitting');
          var rsEvent = new Event(this.rsEvent);
          rsEvent.$save(function () {
            $location.path('/rideshare/admin');
          });
          this.rsEvent = {};
        } else {
          console.log('error submitting');
          $scope.submitted = true;
          debugger;
        }
      };

      $scope.updateEvent = function () {
        if (this.eventForm.$valid) {
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
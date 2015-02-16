'use strict';

// attendees routes use attendee controller
var attendees = require('../controllers/attendee');

module.exports = function(Attendees, app, auth) {

    app.route('/attendee')
      .get(attendees.all)
      .post(auth.requiresLogin, attendees.create);

    app.route('/attendee/:attendeeId')
      .get(auth.isMongoId, auth.requiresLogin, attendees.show)
      .put(auth.isMongoId, auth.requiresLogin, attendees.update)
      .delete(auth.isMongoId, auth.requiresLogin, attendees.destroy);

    app.route('/event/:attendeeIds')
      .get(auth.isMongoId, auth.requiresLogin, attendees.attendees);

    // Finish with setting up the attendeeId param
    app.param('attendeeId', attendees.attendee);

};
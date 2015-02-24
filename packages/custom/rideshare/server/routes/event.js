'use strict';

// events routes use event controller
var events = require('../controllers/event');

module.exports = function(Events, app, auth) {

    app.route('/event')
      .get(events.all)
      .post(auth.requiresLogin, events.create);

    app.route('/event/:eventId')
      .get(auth.isMongoId, auth.requiresLogin, events.show)
      .put(auth.isMongoId, auth.requiresLogin, events.update)
      .delete(auth.isMongoId, auth.requiresLogin, events.destroy);

    // Finish with setting up the eventId param
    app.param('eventId', events.event);

};
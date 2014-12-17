'use strict';

// rideshares routes use rideshare controller
var rideshares = require('../controllers/rideshare');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Reideshares, app, auth) {

    app.route('/rideshare')
      .get(rideshares.all)
      .post(auth.requiresLogin, rideshares.create);

    app.route('/rideshare/:rideshareId')
      .get(auth.isMongoId, auth.requiresLogin, rideshares.show)
      .put(auth.isMongoId, auth.requiresLogin, rideshares.update)
      .delete(auth.isMongoId, auth.requiresLogin, rideshares.destroy);

    // Finish with setting up the rideshareId param
    app.param('rideshareId', rideshares.rideshare);

};
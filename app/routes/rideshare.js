'use strict';

// rideshares routes use rideshare controller
var rideshares = require('../controllers/rideshare');
var authorization = require('./middlewares/authorization');

// rideshare authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.rideshare.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/rideshare', rideshares.all);
    app.post('/rideshare', authorization.requiresLogin, rideshares.create);
    app.get('/rideshare/:rideshareId', rideshares.show);
    app.put('/rideshare/:rideshareId', authorization.requiresLogin, hasAuthorization, rideshares.update);
    app.del('/rideshare/:rideshareId', authorization.requiresLogin, hasAuthorization, rideshares.destroy);

    // Finish with setting up the rideshareId param
    app.param('rideshareId', rideshares.rideshare);

};
'use strict';

// rideshares routes use rideshare controller
var rideshares = require('../controllers/rideshare');

module.exports = function(app) {

    app.get('/rideshare', rideshares.all);
    app.post('/rideshare', rideshares.create);
    app.get('/rideshare/:rideshareId', rideshares.show);
    app.put('/rideshare/:rideshareId', rideshares.update);
    app.del('/rideshare/:rideshareId', rideshares.destroy);

    // Finish with setting up the rideshareId param
    app.param('rideshareId', rideshares.rideshare);

};
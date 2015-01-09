'use strict';

// The Package is past automatically as first parameter
module.exports = function(UsersExtended, app, auth, database) {

  app.get('/usersExtended/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/usersExtended/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/usersExtended/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/usersExtended/example/render', function(req, res, next) {
    UsersExtended.render('index', {
      package: 'users-extended'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

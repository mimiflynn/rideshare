'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var UsersExtended = new Module('users-extended');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
UsersExtended.register(function(app, auth, database, users) {

  //We enable routing. By default the Package Object is passed to the routes
  UsersExtended.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
/*  UsersExtended.menus.add({
    title: 'usersExtended example page',
    link: 'usersExtended example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  UsersExtended.aggregateAsset('css', 'usersExtended.css');

  UsersExtended.angularDependencies(['mean.users']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    UsersExtended.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    UsersExtended.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    UsersExtended.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return UsersExtended;
});

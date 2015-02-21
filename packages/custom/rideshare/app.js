'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rideshare = new Module('rideshare');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rideshare.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Rideshare.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Rideshare.menus.add({
    title: 'Signup for Event',
    link: 'attendee signup',
    roles: ['authenticated'],
    menu: 'main'
  });
  Rideshare.menus.add({
    title: 'Create Event',
    link: 'create event',
    roles: ['authenticated'],
    menu: 'main'
  });
  Rideshare.menus.add({
    title: 'Admin',
    link: 'rideshare admin',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Rideshare.aggregateAsset('js', '../lib/angular-moment/angular-moment.min.js', {
    absolute: false,
    global: true
  });
  Rideshare.aggregateAsset('js', '../lib/momentjs/moment.js', {
    absolute: false,
    global: true
  });

  Rideshare.aggregateAsset('css', '../lib/ng-grid/ng-grid.min.css');
  Rideshare.aggregateAsset('js', '../lib/ng-grid/ng-grid-2.0.7.min.js', {
    absolute: false,
    global: true
  });

  Rideshare.aggregateAsset('js', '../lib/angular-wysiwyg/angular-wysiwyg.js', {
    absolute: false,
    global: true
  });

  Rideshare.aggregateAsset('css', '../lib/angular-bootstrap-colorpicker/css/colorpicker.min.css');
  Rideshare.aggregateAsset('js', '../lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js', {
    absolute: false,
    global: true
  });

  Rideshare.aggregateAsset('css', 'flatty.css');
  Rideshare.aggregateAsset('css', 'screen.css');

  Rideshare.angularDependencies(['mean.system', 'mean.users-extended', 'ngGrid', 'angularMoment', 'wysiwyg.module', 'colorpicker.module']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Rideshare.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Rideshare.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Rideshare.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Rideshare;
});

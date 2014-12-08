'use strict';

// Used users package as template

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rideshare = new Module('rideshare');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rideshare.register(function(app, auth, passport, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Rideshare.routes(app, auth, database, passport);

  //We are adding a link to the main menu for all authenticated users
  // Rideshare.menus.add({
  //     title: 'meanUser example page',
  //     link: 'meanUser example page',
  //     roles: ['authenticated'],
  //     menu: 'main'
  // });

  Rideshare.angularDependencies(['ngGrid']);

  Rideshare.aggregateAsset('js', 'rideshare.js');


  return Rideshare;
});
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Rideshare = mongoose.model('Rideshare'),
  _ = require('lodash');


/**
 * Find rideshare by id
 */
exports.rideshare = function(req, res, next, id) {
  Rideshare.load(id, function(err, rideshare) {
    if (err) return next(err);
    if (!rideshare) return next(new Error('Failed to load rideshare ' + id));
    req.rideshare = rideshare;
    next();
  });
};

/**
 * Create a rideshare
 */
exports.create = function(req, res) {
  var rideshare = new Rideshare(req.body);
  rideshare.user = req.user;

  rideshare.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the rideshare'
      });
    }
    res.jsonp(rideshare);  
  });
};

/**
 * Update a rideshare
 */
exports.update = function(req, res) {
  var rideshare = req.rideshare;

  rideshare = _.extend(rideshare, req.body);

  rideshare.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the rideshare'
      });
    }
    res.jsonp(rideshare);
  });
};

/**
 * Delete an rideshare
 */
exports.destroy = function(req, res) {
  var rideshare = req.rideshare;

  rideshare.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete rider'
      });
    }
    res.json(rideshare);

  });

/*  rideshare.remove(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        rideshare: rideshare
      });
    } else {
      res.jsonp(rideshare);
    }
  });*/

};

/**
 * Show a rideshare
 */
exports.show = function(req, res) {
  res.jsonp(req.rideshare);
};

/**
 * List of rideshare
 */
exports.all = function(req, res) {
  Rideshare.find().sort('-created').populate('user', 'name username').exec(function(err, rideshare) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the rideshares'
      });
    }
    res.jsonp(rideshare);
  });
};

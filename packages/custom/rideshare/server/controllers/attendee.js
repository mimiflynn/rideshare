'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Attendee = mongoose.model('Attendee'),
  _ = require('lodash');


/**
 * Find attendee by id
 */
exports.attendee = function(req, res, next, id) {
  Attendee.load(id, function(err, attendee) {
    if (err) return next(err);
    if (!attendee) return next(new Error('Failed to load attendee ' + id));
    req.attendee = attendee;
    next();
  });
};

/**
 * Create a attendee
 */
exports.create = function(req, res) {
  var attendee = new Attendee(req.body);
  attendee.user = req.user;

  attendee.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the attendee'
      });
    }
    res.jsonp(attendee);  
  });
};

/**
 * Update a attendee
 */
exports.update = function(req, res) {
  var attendee = req.attendee;

  attendee = _.extend(attendee, req.body);

  attendee.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the attendee'
      });
    }
    res.jsonp(attendee);
  });
};

/**
 * Delete an attendee
 */
exports.destroy = function(req, res) {
  var attendee = req.attendee;

  attendee.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete an attendee'
      });
    }
    res.json(attendee);

  });
};

/**
 * Show an attendee
 */
exports.show = function(req, res) {
  res.jsonp(req.attendee);
};

/**
 * Return attendee details per list of attendees by id
 */

exports.attendees = function(req, res) {
  var attendees = [];

  req.forEach(function(id) {
    attendees.push(id.attendee);
  });

  res.jsonp(attendees);
};

/**
 * List of attendees
 */
exports.all = function(req, res) {
  Attendee.find().sort('-created').populate('user', 'name username').exec(function(err, attendee) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the attendees'
      });
    }
    res.jsonp(attendee);
  });
};

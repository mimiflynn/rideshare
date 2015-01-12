'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  RsEvent = mongoose.model('Event'),
  _ = require('lodash');


/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
  RsEvent.load(id, function(err, event) {
    if (err) return next(err);
    if (!event) return next(new Error('Failed to load event ' + id));
    req.event = event;
    next();
  });
};

/**
 * Create a event
 */
exports.create = function(req, res) {
  var event = new RsEvent(req.body);
  event.user = req.user;

  event.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the event'
      });
    }
    res.jsonp(event);  
  });
};

/**
 * Update a event
 */
exports.update = function(req, res) {
  var event = req.event;

  event = _.extend(event, req.body);

  event.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the event'
      });
    }
    res.jsonp(event);
  });
};

/**
 * Delete an event
 */
exports.destroy = function(req, res) {
  var event = req.event;

  event.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete event'
      });
    }
    res.json(event);

  });
};

/**
 * Show a event
 */
exports.show = function(req, res) {
  res.jsonp(req.event);
};

/**
 * List of event
 */
exports.all = function(req, res) {
  RsEvent.find().sort('-created').populate('user', 'name username').exec(function(err, event) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the events'
      });
    }
    res.jsonp(event);
  });
};

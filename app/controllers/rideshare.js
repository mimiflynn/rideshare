'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    rideshare = mongoose.model('rideshare'),
    _ = require('lodash');


/**
 * Find rideshare by id
 */
exports.rideshare = function(req, res, next, id) {
    rideshare.load(id, function(err, rideshare) {
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
    var rideshare = new rideshare(req.body);
    rideshare.user = req.user;

    rideshare.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rideshare: rideshare
            });
        } else {
            res.jsonp(rideshare);
        }
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
            return res.send('users/signup', {
                errors: err.errors,
                rideshare: rideshare
            });
        } else {
            res.jsonp(rideshare);
        }
    });
};

/**
 * Delete an rideshare
 */
exports.destroy = function(req, res) {
    var rideshare = req.rideshare;

    rideshare.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rideshare: rideshare
            });
        } else {
            res.jsonp(rideshare);
        }
    });
};

/**
 * Show an rideshare
 */
exports.show = function(req, res) {
    res.jsonp(req.rideshare);
};

/**
 * List of rideshare
 */
exports.all = function(req, res) {
    rideshare.find().sort('-created').populate('user', 'name username').exec(function(err, rideshare) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rideshare);
        }
    });
};
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RideshareSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    partyNumber: {
        type: String,
        default: '',
        trim: true
    },
    arrivalDate: {
        type: String,
        default: '',
        trim: true
    },
    arrivalTime: {
        type: String,
        default: '',
        trim: true
    },
    arrivalLocation: {
        type: String,
        default: '',
        trim: true
    },
    notes: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    role: {
        type: String,
        default: '',
        trim: true
    },
    car: {
        type: String,
        default: 'Unsorted',
        trim: true
    }
});

/**
 * Statics
 */
RideshareSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Rideshare', RideshareSchema);
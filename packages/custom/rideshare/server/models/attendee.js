'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttendeeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    eventId: {
        type: String
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
        default: '',
        trim: true
    }
});

/**
 * Statics
 */
AttendeeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Attendee', AttendeeSchema);
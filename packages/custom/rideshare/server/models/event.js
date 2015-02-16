'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  organizer: {
    type: String
  },
  invitees :{
    type: Array
  },
  date: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
});

/**
 * Statics
 */
 EventSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Event', EventSchema);
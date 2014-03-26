'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Group Schema
 */

var GroupSchema = new Schema(
  {
    group       : Number,
    section     : Number,
    name        : String,
  }, {
    toJSON: {
      virtuals: true
    }
  }
);

GroupSchema.virtual('fullname').get(function() {
  return this.group+'.'+this.section+' '+this.description;
});

var Group = mongoose.model('Group', GroupSchema);
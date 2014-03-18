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
    description : String,
  }, {
    toJSON: {
      virtuals: true
    }
  }
);

GroupSchema.virtual('name').get(function() {
  return this.group+'.'+this.section+' '+this.description;
});

var Group = mongoose.model('Group', GroupSchema);
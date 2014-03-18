'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Breed Schema
 */

var BreedSchema = new Schema({
    name      : String,
    origin    : String,
    _group    : { type: Schema.Types.ObjectId, ref: 'Group' }
});

/**
 * Validations
 */

 BreedSchema.path('name').validate(function(name) {
  return name.length;
 }, 'Name cannot be blank');

 BreedSchema.path('origin').validate(function(origin) {
  return origin.length;
 }, 'Origin cannot be blank');


var Breed = mongoose.model('Breed', BreedSchema);
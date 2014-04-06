'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Breed Schema
 */

var BreedSchema = new Schema({
    name        : String,
    origin      : String,
    description : String,
    images      : [{
      url          : String, 
      thumb        : String,
      description  : String }],
    _related    : [{ 
      type         : Schema.Types.ObjectId,
      ref          : 'Breed' }],
    _group      : { 
      type         : Schema.Types.ObjectId, 
      ref          : 'Group' }
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
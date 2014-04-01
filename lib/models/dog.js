'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Dog Schema
 */

var DogSchema = new Schema({
    name       : String,
    birth      : Date,
    image      : Boolean,
    _breed     : { type: Schema.Types.ObjectId, ref:'Breed' },
    _related   : [{ type: Schema.Types.ObjectId, ref: 'Dog' }]
});

/**
 * Validations
 */

DogSchema.path('name').validate(function(name) {
  return name.length;
}, 'Name cannot be blank');

DogSchema.path('_breed').validate(function(breed) {
  return breed;
}, 'Breed cannot be blank');


var Dog = mongoose.model('Dog', DogSchema);
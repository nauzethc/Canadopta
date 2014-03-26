'use strict';

var mongoose = require('mongoose'),
    Breed    = mongoose.model('Breed');


// GET - find all
exports.findAll = function(req, res) {
  Breed.find(function(err, breeds) {
    if(!err) {
      res.send(breeds);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// POST - create
exports.createBreed = function(req, res) {
  var breed = new Breed({
    name    : req.body.name,
    origin  : req.body.origin,
    _group  : req.body._group
  });
  breed.save(function(err) {
    if (!err) {
      res.send(breed);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// GET - retrieve
exports.retrieveBreed = function(req, res) {
  Breed.findById(req.params.id, function(err, breed) {
    if (!err) {
      res.send(breed);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// PUT - update
exports.updateBreed = function(req, res) {
  Breed.findById(req.params.id, function(err, breed) {
    breed.name     = req.body.name    || breed.name;
    breed.origin   = req.body.origin  || breed.origin;
    breed._group   = req.body._group  || breed._group;
    breed._related = req.body._related;
    breed.save(function(err) {
      if (!err) {
        res.send(breed);
      } else {
        console.log('ERROR: ' + err);
        res.send(err);
      }
    });
  });
};

// DELETE - delete
exports.deleteBreed = function(req, res) {
  Breed.findById(req.params.id, function(err, breed) {
    breed.remove(function(err) {
      if (!err) {
        res.send(breed);
      } else {
        console.log('ERROR: ' + err);
        res.send(err);
      }
    });
  });
};
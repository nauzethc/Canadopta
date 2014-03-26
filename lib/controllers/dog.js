'use strict';

var mongoose = require('mongoose'),
    Dog = mongoose.model('Dog');


// GET - find all
exports.findAll = function(req, res) {
  Dog.find(function(err, dogs) {
    if (!err) {
      res.send(dogs);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// POST - create
exports.createDog = function(req, res) {
  var dog = new Dog({
    name   : req.body.name,
    birth  : req.body.birth,
    _breed : req.body._breed
  });
  dog.save(function(err) {
    if (!err) {
      res.send(dog);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// GET - retrieve
exports.retrieveDog = function(req, res) {
  Dog.findById(req.params.id, function(err, dog) {
    if (!err) {
      res.send(dog);
    } else {
      console.log('ERROR: ' + err);
      res.send(err);
    }
  });
};

// PUT - update
exports.updateDog = function(req, res) {
  Dog.findById(req.params.id, function(err, dog) {
    dog.name     = req.body.name   || dog.name;
    dog.birth    = req.body.birth  || dog._birth;
    dog._breed   = req.body._breed || dog._breed;
    dog._related = req.body._related;
    dog.save(function(err) {
      if (!err) {
        res.send(dog);
      } else {
        console.log('ERROR: ' + err);
        res.send(err);
      }
    });
  });
};

// DELETE - delete
exports.deleteDog = function(req, res) {
  Dog.findById(req.params.id, function(err, dog) {
    dog.remove(function(err) {
      if (!err) {
        res.send(dog);
      } else {
        console.log('ERROR: ' + err);
        res.send(err);
      }
    });
  });
};
'use strict';

var mongoose = require('mongoose'),
    Breed    = mongoose.model('Breed'),
    fs       = require('fs'),
    im       = require('imageMagick');


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
    _group  : req.body._group,
    image   : false
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
    // Load image if it's present
    if (req.files && req.files.breedImage) {
      var image = __dirname + ('/../../app/images/breeds/' + breed._id + '.jpg');

      // Resize and stores image
      im.resize({
        srcPath: req.files.breedImage.path,
        dstPath: image,
        width:   230
      }, function(err, stdout, stderr) {
        // Save to model
        if (!err) {
          breed.image = true;
          breed.save(function(err) {
            if (!err) {
              res.send(breed);
            } else {
              console.log('ERROR: ' + err);
              res.send(err);
            }
          });
        } else {
          console.log('ERROR: ' + err);
          res.send(err);
        }
      });

    // Load form data otherwise
    } else {
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
    }
  });
};

$scope.uploadImage = function() {

}

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
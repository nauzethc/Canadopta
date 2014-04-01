'use strict';

var mongoose = require('mongoose'),
    Breed    = mongoose.model('Breed'),
    fs       = require('fs'),
    os       = require('os'),
    path     = require('path'),
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

    function save(breed) {
      breed.save(function(err) {
        if (!err) {
          res.send(breed);
        } else {
          console.log('ERROR: ' + err);
          res.send(err);
        }
      });
    }

    if (!err) {
      breed.name     = req.body.name    || breed.name;
      breed.origin   = req.body.origin  || breed.origin;
      breed._group   = req.body._group  || breed._group;
      breed._related = req.body._related;

      if (req.body.imageData) {
        var b64Data = req.body.imageData.replace(/^data:image\/\w+;base64,/, "");
        var fd  = path.join(os.tmpdir(), breed._id.toString());
        var dst = path.join(__dirname, '/../../app/images/breeds/', breed._id.toString()+'.jpg');
        fs.writeFileSync(fd, b64Data, 'base64' );
        im.resize({
          srcPath: fd,
          dstPath: dst,
          width:   230
        }, function(err, stdout, stderr) {
          // Save to model
          if (!err) {
            breed.image = true;
            fs.unlink(fd);
            save(breed);
          } else {
            console.log('ERROR: ' + err);
            res.send(err);
          }
        });
      } else {
        save(breed);
      }

    } else {
        console.log('ERROR: ' + err);
        res.send(err);
    }
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
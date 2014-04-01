'use strict';

var mongoose = require('mongoose'),
    Dog      = mongoose.model('Dog'),
    Breed    = mongoose.model('Breed'),
    fs       = require('fs'),
    os       = require('os'),
    path     = require('path'),
    im       = require('imageMagick');


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

    function save(dog) {
      dog.save(function(err) {
        if (!err) {
          res.send(dog);
        } else {
          console.log('ERROR: ' + err);
          res.send(err);
        }
      });
    }

    if (!err) {
      dog.name     = req.body.name   || dog.name;
      dog.birth    = req.body.birth  || dog._birth;
      dog._breed   = req.body._breed || dog._breed;
      dog._related = req.body._related;

      if (req.body.imageData) {
        var b64Data = req.body.imageData.replace(/^data:image\/\w+;base64,/, "");
        var fd  = path.join(os.tmpdir(), dog._id.toString());
        var dst = path.join(__dirname, '/../../app/images/dogs/', dog._id.toString()+'.jpg');
        fs.writeFileSync(fd, b64Data, 'base64' );
        im.resize({
          srcPath: fd,
          dstPath: dst,
          width:   230
        }, function(err, stdout, stderr) {
          // Save to model
          if (!err) {
            dog.image = true;
            fs.unlink(fd);
            save(dog);
          } else {
            console.log('ERROR: ' + err);
            res.send(err);
          }
        });
      } else {
        save(dog);
      }

    } else {
        console.log('ERROR: ' + err);
        res.send(err);
    }
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
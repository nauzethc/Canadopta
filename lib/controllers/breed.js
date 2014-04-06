'use strict';

var mongoose = require('mongoose'),
    Breed    = mongoose.model('Breed'),
    fs       = require('fs'),
    os       = require('os'),
    path     = require('path'),
    im       = require('imageMagick'),
    crypto   = require('crypto');



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

    function save(breed, res) {
      breed.save(function(err) {
        if (!err) {
          res.send(breed);
        } else {
          console.log('ERROR: ' + err);
          res.send(err);
        }
      });
    }

    function saveImages(breed, list, res, callback) {
      if (list.length > 0) {
        var data = list.pop()
        var b64Data = data.replace(/^data:image\/\w+;base64,/, "");

        // Generate hash name for new image
        var hash = crypto.createHash('md5').update(
          data.substring(0, 100)
          +breed._id.toString()
          +Date().toString()
        ).digest('hex');

        var url   = '/images/breeds/'+hash+'.jpg';
        var thumb = '/images/breeds/thumbs/'+hash+'.jpg'; 

        // Generate 
        var dst = path.join(__dirname, '/../../app/', url);
        var dst_thumb = path.join(__dirname, '/../../app/', thumb);

        // Write to fs and resize it
        fs.writeFileSync(dst, b64Data, 'base64' );
        im.resize({
          srcPath: dst,
          dstPath: dst_thumb,
          width: 240
        }, function(err, stdout, stderr) {
          // Save to model
          if (!err) {
            var image = { url: url, thumb: thumb, description: 'New imaged added' };
            breed.images.push(image);
            saveImages(breed, list, res, callback);
          } else {
            console.log('ERROR: ' + err);
            res.send(err);
          }
        });
      } else {
        return callback();
      }
    }

    if (!err) {
      breed.name        = req.body.name    || breed.name;
      breed.origin      = req.body.origin  || breed.origin;
      breed._group      = req.body._group  || breed._group;
      breed.description = req.body.description || breed.description;
      breed._related    = req.body._related;

      if (req.body.imagesData) {
        saveImages(breed, req.body.imagesData, res, function() {
          save(breed, res);
        });
      } else {
        save(breed, res);
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
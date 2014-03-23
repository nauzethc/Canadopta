'use strict';

var mongoose = require('mongoose'),
    Dog      = mongoose.model('Dog');


// GET - find all

exports.findAll = function(req, res) {
    Dog
        .find(function(err, dogs) {
            if(!err) {
                res.send(dogs);
            } else {
                console.log('ERROR: ' + err);
                res.send(err);
            }
        })
        .populate('_breed');
};


// POST - create

exports.createDog = function(req, res) {
    var dog = new Dog({
        name    : req.body.name,
        birth   : req.body.birth,
        _breed  : req.body._breed
    });

    dog.save(function(err) {
        if (!err) {
            console.log('Created');
        } else {
            console.log('ERROR: ' + err);
        }
    });
    res.send(dog);
};


// GET - retrieve

exports.retrieveDog = function(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        if (!err) {
            res.send(dog);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};


// PUT - update

exports.updateDog = function(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.name   =  req.body.name;
        dog.birth  =  req.body.birth;
        dog._breed =  req.body._breed;
        dog.related = req.body.related;

        dog.save(function(err) {
            if (!err) {
                console.log('Updated');
            } else {
                console.log('ERROR: ' + err);
            }
        });
        res.send(dog);
    });
};


// DELETE - delete

exports.deleteDog = function(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.remove(function(err) {
            if (!err) {
                console.log('Removed');
            } else {
                console.log('ERROR: ' + err);
            }
        });
        res.send(dog);
    });
};
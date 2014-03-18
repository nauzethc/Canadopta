'use strict';

var mongoose = require('mongoose'),
    Breed    = mongoose.model('Breed');


// GET - find all

exports.findAll = function(req, res) {
    Breed
        .find(function(err, breeds) {
            if(!err) {
                res.send(breeds);
            } else {
                console.log('ERROR: ' + err);
                res.send(err);
            }
        })
        .populate('_group');
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
            console.log('Created');
        } else {
            console.log('ERROR: ' + err);
        }
    });
    res.send(breed);
};


// GET - retrieve

exports.retrieveBreed = function(req, res) {
    Breed.findById(req.params.id, function(err, breed) {
        if (!err) {
            res.send(breed);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};


// PUT - update

exports.updateBreed = function(req, res) {
    Breed.findById(req.params.id, function(err, breed) {
        breed.name   = req.body.name;
        breed.origin = req.body.origin;
        breed._group = req.body._group;

        breed.save(function(err) {
            if (!err) {
                console.log('Updated');
            } else {
                console.log('ERROR: ' + err);
            }
        });
        res.send(breed);
    });
};


// DELETE - delete

exports.deleteBreed = function(req, res) {
    Breed.findById(req.params.id, function(err, breed) {
        breed.remove(function(err) {
            if (!err) {
                console.log('Removed');
            } else {
                console.log('ERROR: ' + err);
            }
        });
        res.send(breed);
    });
};
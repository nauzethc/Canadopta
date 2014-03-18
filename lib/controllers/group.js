'use strict';

var mongoose = require('mongoose'),
    Group    = mongoose.model('Group');


// GET - find all

exports.findAll = function(req, res) {
    Group.find(function(err, groups) {
        if(!err) {
            res.send(groups);
        } else {
            console.log('ERROR: ' + err);
            res.send(err);
        }
    });
};
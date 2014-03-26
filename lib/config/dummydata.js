'use strict';

var mongoose = require('mongoose');

/**
 * Populate database with sample application data
 *

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

*/

var Group = mongoose.model('Group');

Group.find(function(err, groups) {
  if (!err && !groups.length) {
    Group.create(
        { group:  1, section:  1, name: 'Sheepdogs' },
        { group:  1, section:  2, name: 'Cattle Dogs (except Swiss Cattle Dogs)' },
        { group:  2, section:  1, name: 'Pinscher and Schnauzer type' },
        { group:  2, section:  2, name: 'Molossoid breeds' },
        { group:  2, section:  3, name: 'Swiss Mountain and Cattle Dogs' },
        { group:  3, section:  1, name: 'Large and medium-sized Terriers' },
        { group:  3, section:  2, name: 'Small-sized Terriers' },
        { group:  3, section:  3, name: 'Bull type Terriers' },
        { group:  3, section:  4, name: 'Toy Terriers' },
        { group:  4, section:  1, name: 'Dachshunds' },
        { group:  5, section:  1, name: 'Nordic Sledge Dogs' },
        { group:  5, section:  2, name: 'Nordic Hunting Dogs' },
        { group:  5, section:  3, name: 'Nordic Watchdogs and Herders' },
        { group:  5, section:  4, name: 'European Spitz' },
        { group:  5, section:  5, name: 'Asian Spitz and related breeds' },
        { group:  5, section:  6, name: 'Primitive type' },
        { group:  5, section:  7, name: 'Primitive type - Hunting Dogs' },
        { group:  6, section:  1, name: 'Scenthounds' },
        { group:  6, section:  2, name: 'Leash (scent) Hounds' },
        { group:  6, section:  3, name: 'Related breeds' },
        { group:  7, section:  1, name: 'Continental Pointing Dogs' },
        { group:  7, section:  2, name: 'British and Irish Pointers and Setters' },
        { group:  8, section:  1, name: 'Retrievers' },
        { group:  8, section:  2, name: 'Flushing Dogs' },
        { group:  8, section:  3, name: 'Water Dogs' },
        { group:  9, section:  1, name: 'Bichons and related breeds' },
        { group:  9, section:  2, name: 'Poodle' },
        { group:  9, section:  3, name: 'Small Belgian Dogs' },
        { group:  9, section:  4, name: 'Hairless Dogs' },
        { group:  9, section:  5, name: 'Tibetan breeds' },
        { group:  9, section:  6, name: 'Chihuahueño' },
        { group:  9, section:  7, name: 'English Toy Spaniels' },
        { group:  9, section:  8, name: 'Japan Chin and Pekingese' },
        { group:  9, section:  9, name: 'Continental Toy Spaniel' },
        { group:  9, section: 10, name: 'Kromfohrländer' },
        { group:  9, section: 11, name: 'Small Molossian type Dogs' },
        { group: 10, section:  1, name: 'Long-haired or fringed Sighthounds' },
        { group: 10, section:  2, name: 'Rough-haired Sighthounds' },
        { group: 10, section:  3, name: 'Short-haired Sighthounds' },

        function() {
          console.log("Finish populating groups");
        }
    );
  }
});
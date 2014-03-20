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
        { group:  1, section:  1, description: 'Sheepdogs' },
        { group:  1, section:  2, description: 'Cattle Dogs (except Swiss Cattle Dogs)' },
        { group:  2, section:  1, description: 'Pinscher and Schnauzer type' },
        { group:  2, section:  2, description: 'Molossoid breeds' },
        { group:  2, section:  3, description: 'Swiss Mountain and Cattle Dogs' },
        { group:  3, section:  1, description: 'Large and medium-sized Terriers' },
        { group:  3, section:  2, description: 'Small-sized Terriers' },
        { group:  3, section:  3, description: 'Bull type Terriers' },
        { group:  3, section:  4, description: 'Toy Terriers' },
        { group:  4, section:  1, description: 'Dachshunds' },
        { group:  5, section:  1, description: 'Nordic Sledge Dogs' },
        { group:  5, section:  2, description: 'Nordic Hunting Dogs' },
        { group:  5, section:  3, description: 'Nordic Watchdogs and Herders' },
        { group:  5, section:  4, description: 'European Spitz' },
        { group:  5, section:  5, description: 'Asian Spitz and related breeds' },
        { group:  5, section:  6, description: 'Primitive type' },
        { group:  5, section:  7, description: 'Primitive type - Hunting Dogs' },
        { group:  6, section:  1, description: 'Scenthounds' },
        { group:  6, section:  2, description: 'Leash (scent) Hounds' },
        { group:  6, section:  3, description: 'Related breeds' },
        { group:  7, section:  1, description: 'Continental Pointing Dogs' },
        { group:  7, section:  2, description: 'British and Irish Pointers and Setters' },
        { group:  8, section:  1, description: 'Retrievers' },
        { group:  8, section:  2, description: 'Flushing Dogs' },
        { group:  8, section:  3, description: 'Water Dogs' },
        { group:  9, section:  1, description: 'Bichons and related breeds' },
        { group:  9, section:  2, description: 'Poodle' },
        { group:  9, section:  3, description: 'Small Belgian Dogs' },
        { group:  9, section:  4, description: 'Hairless Dogs' },
        { group:  9, section:  5, description: 'Tibetan breeds' },
        { group:  9, section:  6, description: 'Chihuahueño' },
        { group:  9, section:  7, description: 'English Toy Spaniels' },
        { group:  9, section:  8, description: 'Japan Chin and Pekingese' },
        { group:  9, section:  9, description: 'Continental Toy Spaniel' },
        { group:  9, section: 10, description: 'Kromfohrländer' },
        { group:  9, section: 11, description: 'Small Molossian type Dogs' },
        { group: 10, section:  1, description: 'Long-haired or fringed Sighthounds' },
        { group: 10, section:  2, description: 'Rough-haired Sighthounds' },
        { group: 10, section:  3, description: 'Short-haired Sighthounds' },

        function() {
          console.log("Finish populating groups");
        }
    );
  }
});
'use strict';

var breed = require('./controllers/breed'),
    group = require('./controllers/group'),
    dog   = require('./controllers/dog'),
    index = require('./controllers/index');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  // Breed
  app.get(    '/api/breeds',     breed.findAll);
  app.post(   '/api/breeds',     breed.createBreed);
  app.get(    '/api/breeds/:id', breed.retrieveBreed);
  app.put(    '/api/breeds/:id', breed.updateBreed);
  app.delete( '/api/breeds/:id', breed.deleteBreed);

  // Group
  app.get(    '/api/groups',     group.findAll);
  app.get(    '/api/groups/:id', group.retrieveGroup);

  // Dogs
  app.get(    '/api/dogs',       dog.findAll);
  app.post(   '/api/dogs',       dog.createDog);
  app.get(    '/api/dogs/:id',   dog.retrieveDog);
  app.put(    '/api/dogs/:id',   dog.updateDog);
  app.delete( '/api/dogs/:id',   dog.deleteDog);


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
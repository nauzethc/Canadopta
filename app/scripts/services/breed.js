'use strict';

angular.module('canadoptaApp')

  .factory('Breed',
    function Breed($resource) {
      return $resource('/api/breeds/:id', { id: '@id' },
        {
          query:  { method: 'GET', params: { id: '' }, isArray: true },
          save:   { method: 'PUT'    },
          create: { method: 'POST'   },
          remove: { method: 'DELETE' }
        }
      );
    }
  );

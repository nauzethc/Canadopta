'use strict';

angular.module('canadoptaApp')

  .factory('Dog',
    function Dog($resource) {
      return $resource('/api/dogs/:id', { id: '@_id' },
        {
          save:   { method: 'PUT'    },
          create: { method: 'POST'   },
          remove: { method: 'DELETE' }
        }
      );
    }
  );

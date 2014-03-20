'use strict';

angular.module('canadoptaApp')

  .factory('Breed',
    function Breed($resource) {
      return $resource('/api/breeds/:id', { id: '@_id' },
        {
          save:   { method: 'PUT'    },
          create: { method: 'POST'   },
          remove: { method: 'DELETE' }
        }
      );
    }
  );

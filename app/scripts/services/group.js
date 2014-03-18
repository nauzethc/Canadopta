'use strict';

angular.module('canadoptaApp')
  .factory('Group',
    function Group($resource) {
      return $resource('/api/groups/:id', {},
        {
          query: { method: 'GET', params: { id: ''}, isArray: true }
        }
      );
    }
  );

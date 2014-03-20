'use strict';

angular.module('canadoptaApp')
  .factory('Group',
    function Group($resource) {
      return $resource('/api/groups/:id', {});
    }
  );

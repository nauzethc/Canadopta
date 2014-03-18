'use strict';

angular.module('canadoptaApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      }, {
        'title': 'Breeds',
        'link': '/breeds'
      }
    ];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

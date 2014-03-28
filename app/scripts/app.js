'use strict';

angular.module('canadoptaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/breeds', {
        templateUrl: 'partials/breed-list',
        controller: 'BreedListCtrl'
      })
      .when('/breeds/:id', {
        templateUrl: 'partials/breed-detail',
        controller: 'BreedDetailCtrl'
      })
      .when('/dogs', {
        templateUrl: 'partials/dog-list',
        controller: 'DogListCtrl'
      })
      .when('/dogs/:id', {
        templateUrl: 'partials/dog-detail',
        controller: 'DogDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })

  .directive('holderjs', function() {
    return {
      link: function(scope, element, attrs) {
        Holder.run({ images: element[0], nocss: true });
      }
    };
  });
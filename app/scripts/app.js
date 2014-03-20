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
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
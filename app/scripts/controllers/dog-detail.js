'use strict';

angular.module('canadoptaApp')
  .controller('DogDetailCtrl', function ($scope, $routeParams, $location, Dog, Breed) {

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
      if (!$scope.breeds) $scope.breeds = Breed.query();
      if (!$scope.dogs)   $scope.dogs   = Dog.query();
    };

    $scope.retrieveDog = function(id) {
      $scope.dog = Dog.get({ id: id },
        function(dog, status) {
          // OK
          //$scope.retrieveGroup(breed._group);
          console.log(dog);
          $scope.dog.breed = Breed.get({ id: dog._breed });
          $scope.retrieveRelatedDogs(dog.related);
        },
        function(status) {} // Error
      );
    };

    $scope.retrieveRelatedDogs = function(dogs) {
      $scope.relatedDogs = [];
      for (var i=0, j=dogs.length; i<j; i++) {
        Dog.get({ id: dogs[i] },
          function(dog, status) {
            $scope.relatedDogs.push(dog);
          }
        );
      }
    }

    $scope.retrieveDog($routeParams.id);

  });
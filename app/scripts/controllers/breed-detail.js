'use strict';

angular.module('canadoptaApp')
  .controller('BreedDetailCtrl', function ($scope, $routeParams, $location, Breed, Group) {

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
      if (!$scope.groups) $scope.groups = Group.query();
      if (!$scope.breeds) $scope.breeds = Breed.query();
    };


    // Get related models
    function populateBreed(breed) {
      breed.group   = Group.get({ id: breed._group });
      breed.related = [];
      breed._related.forEach(function(_id) {
        Breed.get({ id: _id }, function(rbreed, status) {
          breed.related.push(rbreed);
        });
      });
    }


    // Get current Breed
    $scope.retrieveBreed = function(_id) {
      Breed.get({ id: _id },
        function(breed, status) {
          $scope.breed = breed;
          populateBreed($scope.breed);
        },
        function(status) {} // Error
      );
    };


    // Update current Breed
    $scope.updateBreed = function() {
      if (angular.isUndefined($scope.breed.name)   ||
          angular.isUndefined($scope.breed.origin) ||
          angular.isUndefined($scope.breed._group) ) {
        console.log("Incomplete");
      } else {
        $scope.breed.$save(
          // OK
          function(breed, status){
            // Emit event for updated one
            $scope.$emit('BreedDetailCtrl.updateBreed.ok', breed);
            // Re-populate fields
            populateBreed($scope.breed);
            // Disable form
            $scope.toggleForm();
          },
          // Error
          function(status){
            // Emit event for error
            $scope.$emit('BreedDetailCtrl.updateBreed.error', status);
          }
        );
      }
    };


    $scope.deleteBreed = function() {
      $('#deleteBreedModal').modal('hide');
      $('#deleteBreedModal').on('hidden.bs.modal', function(event) {
        $scope.breed.$remove(
          // OK
          function(resource, status) {
            // Emit event for deleted
            $scope.$emit('BreedDetailCtrl.deleteBreed.ok', breed);
            // Redirect to main page
            $location.url('/breeds/');
          },
          // Error
          function(status) {
            // Emit event for error
            $scope.$emit('BreedDetailCtrl.deleteBreed.error', status);
          }
        );
      });
    };


    // Events

    $scope.$on('BreedDetailCtrl.updateBreed.ok', function(event, breed) {
      console.log(breed);
    });
    $scope.$on('BreedDetailCtrl.updateBreed.error', function(event, error) {
      console.log(error);
    });
    $scope.$on('BreedDetailCtrl.deleteBreed.ok', function(event, breed) {
      console.log(breed);
    });
    $scope.$on('BreedDetailCtrl.deleteBreed.error', function(event, error) {
      console.log(error);
    });


    $scope.retrieveBreed($routeParams.id);
  });
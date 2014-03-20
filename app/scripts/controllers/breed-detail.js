'use strict';

angular.module('canadoptaApp')
  .controller('BreedDetailCtrl', function ($scope, $routeParams, $location, Breed, Group) {

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
      if (!$scope.groups) $scope.groups = Group.query();
      if (!$scope.breeds) $scope.breeds = Breed.query();
    };

    $scope.retrieveGroup = function(groupId) {
      $scope.group = Group.get({ id: groupId },
        function(group, status) {}, // OK
        function(status) {}         // Error
      );
    };

    $scope.retrieveRelatedBreeds = function(breeds) {
      $scope.relatedBreeds = [];
      for (var i=0, j=breeds.length; i<j; i++) {
        Breed.get({ id: breeds[i] },
          function(breed, status) {
            $scope.relatedBreeds.push(breed);
          }
        );
      }
    }

    $scope.retrieveBreed = function() {
      $scope.breed = Breed.get({ id: $routeParams.id },
        function(breed, status) {
          // OK
          $scope.retrieveGroup(breed._group);
          $scope.retrieveRelatedBreeds(breed.related);
        },
        function(status) {} // Error
      );
    };

    $scope.updateBreed = function() {
      if (angular.isUndefined($scope.breed.name)   ||
          angular.isUndefined($scope.breed.origin) ||
          angular.isUndefined($scope.breed._group) ) {
        console.log("Incomplete");
      } else {
        $scope.breed.$save(
          function(breed, status){
            $scope.retrieveGroup(breed._group);
            $scope.retrieveRelatedBreeds(breed.related);
            $scope.toggleForm();
          },
          function(status){} // Error
        );
      }
    };

    $scope.deleteBreed = function() {
      $('#deleteBreedModal').modal('hide');
      $('#deleteBreedModal').on('hidden.bs.modal', function(event) {
        $scope.breed.$remove(

          function(resource, status) {
            // OK
            $location.url('/breeds/');
          },
          function(status) {} // Error
        );
      });
    };

    $scope.retrieveBreed();
  });
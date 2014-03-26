'use strict';

angular.module('canadoptaApp')
  .controller('BreedListCtrl', function ($scope, Breed, Group) {

    $scope.breeds = Breed.query(
      // OK
      function(breeds, status) {},
      // Error
      function(status) {}
    );

    $scope.groups = Group.query(
      // OK
      function(groups, status) {},
      // Error
      function(status) {}
    );


    $scope.orderGroups = function(group) {
      return group.group * 100 + group.section;
    };


    $scope.createBreed = function(form) {
      if (angular.isUndefined(form.name)   ||
          angular.isUndefined(form.origin) ||
          angular.isUndefined(form._group)) {
          console.log("Incomplete");

      } else {
        Breed.create({}, form,
          function(breed, status) {
            // Add to list
            $scope.breeds.push(breed);
            // Emit event for new one
            $scope.$emit('BreedListCtrl.createBreed.ok', breed);
            // Clean form
            $scope.breedForm.$setPristine();
            $scope.form = {};
          },
          function(status) {
            // Emit event for error
            $scope.$emit('BreedListCtrl.createBreed.error', status);
          }
        );
      }
    };


    $scope.deleteBreed = function(_id, index) {
      Breed.remove({ id: _id },
        // OK
        function(breed, status) {
          // Remove from list
          $scope.breeds.splice(index, 1);
          // Emit event for deleted one
          $scope.$emit('BreedListCtrl.deleteBreed.ok', breed);
        },
        // Error
        function(status) {
          // Emit event for error
          $scope.$emit('BreedListCtrl.deleteBreed.error', status);
        }
      );
    };


    // Events

    $scope.$on('BreedListCtrl.createBreed.ok', function(event, breed) {
      console.log(breed);
    });
    $scope.$on('BreedListCtrl.createBreed.error', function(event, error) {
      console.log(error);
    });
    $scope.$on('BreedListCtrl.deleteBreed.ok', function(event, breed) {
      console.log(breed);
    });
    $scope.$on('BreedListCtrl.deleteBreed.error', function(event, error) {
      console.log(error);
    });

  });

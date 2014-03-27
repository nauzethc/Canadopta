'use strict';

angular.module('canadoptaApp')
  .controller('DogListCtrl', function ($scope, Dog, Breed) {

    // Get breeds
    Breed.query(
      function(breeds, status) {
        $scope.breeds = breeds;
        // Create breeds index for getting from dogs
        $scope._breeds = {};
        $scope.breeds.forEach(function(breed, i) {
          $scope._breeds[breed._id] = i;
        });
        // Get dogs
        Dog.query(
          function(dogs, status) {
            $scope.dogs = dogs;
            // Populate breeds on dogs
            $scope.dogs.forEach(function(dog) {
              dog.breed = $scope.breeds[ $scope._breeds[dog._breed] ];
            });
          }
        );
      }
    );


    $scope.createDog = function(form) {
      if (angular.isUndefined(form.name)) {
          console.log("Incomplete");

      } else {
        Dog.create({}, form,
          function(dog, status) {
            // Populate breed
            dog.breed = $scope.breeds[ $scope._breeds[dog._breed] ];
            // Add to list
            $scope.dogs.push(dog);
            // Emit event for new one added
            $scope.$emit('DogListCtrl.createDog.ok', dog);
            // Clean form
            $scope.dogForm.$setPristine();
            $scope.form = {};
          },
          function(status) {
            // Emit evenf for error
            $scope.$emit('DogListCtrl.createDog.error', status);
          }
        );
      }
    };


    $scope.deleteDog = function(_id, index) {
      Dog.remove({ id: _id },
        // OK
        function(dog, status) {
          // Remove from list
          $scope.dogs.splice(index, 1);
          // Emit event for deleted one
          $scope.$emit('DogListCtrl.deleteDog.ok', dog);
        },
        // Error
        function(status) {
          // Emit event for error
          $scope.$emit('DogListCtrl.deleteDog.error', status);
        }
      );
    };


    // Events

    $scope.$on('DogListCtrl.createDog.ok', function(event, dog) {
      console.log(dog);
    });
    $scope.$on('DogListCtrl.createDog.error', function(event, error) {
      console.log(error);
    });
    $scope.$on('DogListCtrl.deleteDog.ok', function(event, dog) {
      console.log(dog);
    });
    $scope.$on('DogListCtrl.deleteDog.error', function(event, error) {
      console.log(error);
    });

  });
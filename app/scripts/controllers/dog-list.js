'use strict';

angular.module('canadoptaApp')
  .controller('DogListCtrl', function ($scope, Dog, Breed) {

    $scope.dogs = Dog.query(
      // OK
      function(dogs, status) {},
      // Error
      function(status) {}
    );

    $scope.breeds = Breed.query(
      // OK
      function(breeds, status) {},
      // Error
      function(status) {}
    );


    $scope.createDog = function(form) {
      if (angular.isUndefined(form.name)) {
          console.log("Incomplete");

      } else {
        Dog.create({}, form,
          function(dog, status) {
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
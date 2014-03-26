'use strict';

angular.module('canadoptaApp')
  .controller('DogDetailCtrl', function ($scope, $routeParams, $location, Dog, Breed) {

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
      if (!$scope.breeds) $scope.breeds = Breed.query();
      if (!$scope.dogs)   $scope.dogs   = Dog.query();
    };


    // Get related models
    function populateDog(dog) {
      dog.breed   = Breed.get({ id: dog._breed });
      dog.related = [];
      for (var i=0, j=dog._related.length; i<j; i++) {
        Dog.get({ id: dog._related[i] }, function(rdog, status) {
          dog.related.push(rdog);
        });
      }
    }


    // Retrieve current dog
    $scope.retrieveDog = function(_id) {
      Dog.get({ id: _id },
        function(dog, status) {
          $scope.dog = dog;
          populateDog($scope.dog);
        },
        function(status) {} // Error
      );
    };


    // Update current Dog
    $scope.updateDog = function() {
      if (angular.isUndefined($scope.dog.name)   ||
          angular.isUndefined($scope.dog._breed) ||
          angular.isUndefined($scope.dog.birth) ) {
        console.log("Incomplete");
      } else {
        $scope.dog.$save(
          // OK
          function(dog, status){
            // Emit event for updated one
            $scope.$emit('DogDetailCtrl.updatedDog.ok', dog);
            // Re-populate fields
            populateDog($scope.dog);
            // Disable form
            $scope.toggleForm();
          },
          // Error
          function(status){
            // Emit event for error
            $scope.$emit('DogDetailCtrl.updatedDog.error', status);
          }
        );
      }
    };


    // Events

    $scope.$on('DogDetailCtrl.updateDog.ok', function(event, dog) {
      console.log(dog);
    });
    $scope.$on('DogDetailCtrl.updateDog.error', function(event, error) {
      console.log(error);
    });


    $scope.retrieveDog($routeParams.id);
  });
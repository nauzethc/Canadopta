'use strict';

angular.module('canadoptaApp')
  .controller('DogDetailCtrl', function ($scope, $routeParams, $location, Dog, Breed) {

    var dropImage;

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.form = {
        name     : $scope.dog.name,
        birth    : $scope.dog.birth,
        _breed   : $scope.dog._breed,
        _related : $scope.dog._related
      };

      // Toggle draggable
      if (!dropImage)
        dropImage = new Dropper.DroppableImage(
          document.getElementById('dogImage'),   // Element
          function(e){ $scope.loadImage(e) }     // Handler
        );
      dropImage.toggle();

      $scope.showForm = !$scope.showForm;
      if (!$scope.breeds) $scope.breeds = Breed.query();
      if (!$scope.dogs)   $scope.dogs   = Dog.query();
    };


    // Get related models
    function populateDog(dog) {
      dog.breed   = Breed.get({ id: dog._breed });
      dog.related = [];
      dog._related.forEach(function(_id){
        Dog.get({ id: _id }, function(rdog, status) {
          dog.related.push(rdog);
        });
      });
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
      if (angular.isUndefined($scope.form.name)   ||
          angular.isUndefined($scope.form._breed) ||
          angular.isUndefined($scope.form.birth) ) {
        console.log("Incomplete");
      } else {
        $scope.dog.name     = $scope.form.name;
        $scope.dog.birth    = $scope.form.birth;
        $scope.dog._breed   = $scope.form._breed;
        $scope.dog._related = $scope.form._related;
        if ($scope.form.imageData) {
          $scope.dog.imageData = $scope.form.imageData;
        }
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


    $scope.loadImage = function(e) {
      var image;
      if (!e) {
        image = document.getElementById('inputImage').files[0];
      } else {
        image = e.dataTransfer.files[0];
      }
      var reader = new FileReader();

      // On load, assign it to form
      reader.onloadend = function(event) {
        $scope.form.imageData = event.target.result;
        document.getElementById('dogImage').setAttribute('src', event.target.result);
      };
      // Check size
      if (image.size < 104857600) {
        reader.readAsDataURL(image);
        $scope.form.imageCheck = "has-success";
      } else {
        $scope.form.imageCheck = "has-error";
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
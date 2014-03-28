'use strict';

angular.module('canadoptaApp')
  .controller('BreedDetailCtrl', function ($scope, $routeParams, $location, Breed, Group) {

    // Activate form controls
    $scope.toggleForm = function() {
      $scope.form = {
        name     : $scope.breed.name,
        origin   : $scope.breed.origin,
        _group   : $scope.breed._group,
        _related : $scope.breed._related
      };
      $scope.showForm = !$scope.showForm;
      if (!$scope.groups) $scope.groups = Group.query();
      if (!$scope.breeds) $scope.breeds = Breed.query();
    };


    // Get related models
    function populateBreed(breed) {
      breed.group   = Group.get({ id: breed._group });
      breed.related = [];
      if (breed._related) {
        breed._related.forEach(function(_id) {
          Breed.get({ id: _id }, function(rbreed, status) {
            breed.related.push(rbreed);
          });
        });
      }
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
      if (angular.isUndefined($scope.form.name)   ||
          angular.isUndefined($scope.form.origin) ||
          angular.isUndefined($scope.form._group) ) {
        console.log("Incomplete");
      } else {
        $scope.breed.name     = $scope.form.name;
        $scope.breed.origin   = $scope.form.origin;
        $scope.breed._group   = $scope.form._group;
        $scope.breed._related = $scope.form._related;
        if ($scope.form.imageData) {
          $scope.breed.imageData = $scope.form.imageData;
        }
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

    $scope.loadImage = function() {
      var image = document.getElementById('inputImage').files[0],
          reader = new FileReader();

      // On load, assign it to form
      reader.onloadend = function(event) {
        $scope.form.imageData = event.target.result;
      }
      // Check size
      if (image.size < 104857600) {
        reader.readAsDataURL(image);
        $scope.form.imageCheck = "has-success";
      } else {
        $scope.form.imageCheck = "has-error";
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
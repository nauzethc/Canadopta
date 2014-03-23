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
            function(newDog, status) {
                // Eimt event for new one added
                // $scope.$emit('BreedListCtrl.newBreedAdded', resource);
                // Clean form
                $scope.dogForm.$setPristine();
                $scope.form = {};

                if (webkitNotifications.checkPermission() === 0) {
                  var notification = webkitNotifications.createNotification(
                    '',
                    'New dog added!',
                    newDog.name + ' has been added to database'
                  );
                  notification.show();
                }

                $scope.dogs.push(newDog);
                console.log(newDog);
            },

            function(status) {
                console.log("Error!");
                console.log(status);
            }
        );
      }
    };

    $scope.deleteDog = function(dogId, index) {
      Dog.remove({ id: dogId },
        // OK
        function(dog, status) {
          $scope.dogs.splice(index, 1);
        },
        // Error
        function(status) {
          console.log(status);
        }
      );
    };

  });
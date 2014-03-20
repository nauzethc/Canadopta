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

    $scope.createBreed = function(form) {
      if (angular.isUndefined(form.name)   ||
          angular.isUndefined(form.origin) ) {
          console.log("Incomplete");

      } else {
        Breed.create({}, form,
            function(newBreed, status) {
                // Eimt event for new one added
                // $scope.$emit('BreedListCtrl.newBreedAdded', resource);
                // Clean form
                $scope.breedForm.$setPristine();
                $scope.form = {};

                if (webkitNotifications.checkPermission() === 0) {
                  var notification = webkitNotifications.createNotification(
                    '',
                    'New breed added!',
                    newBreed.name + ' has been added to database'
                  );
                  notification.show();
                }

                $scope.breeds.push(newBreed);
            },

            function(status) {
                console.log("Error!");
                console.log(status);
            }
        );
      }
    };

    $scope.deleteBreed = function(breedId, index) {
      Breed.remove({ id: breedId },
        // OK
        function(breed, status) {
          $scope.breeds.splice(index, 1);
        },
        // Error
        function(status) {
          console.log(status);
        }
      );
    };

  });

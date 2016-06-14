'use strict';

angular.module('pfgApp')
  .controller('UserCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.users = User.resource.query();
    console.log('Usuarios: '+User.resource.query());



    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
          .then( function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch( function() {
            $scope.errors.other = 'Incorrect password';
            $scope.message = 'Incorrect password';
          });
      }
    };

    $scope.delete = function(user) {
      User.resource.remove({ id: user.id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });

'use strict';



angular.module('pfgApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'app/scripts/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });

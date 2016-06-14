'use strict';


angular.module('pfgApp')
	.directive('timeline',function() {
    return {
        templateUrl:'app/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });

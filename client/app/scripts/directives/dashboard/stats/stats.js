'use strict';


angular.module('pfgApp')
    .directive('stats',function() {
    	return {
  		templateUrl:'app/scripts/directives/dashboard/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@'
  		}

  	}
  });

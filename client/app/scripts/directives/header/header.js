'use strict';

angular.module('pfgApp')
	.directive('headeradmin',function(){
		return {
        templateUrl:'app/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});



'use strict';


angular.module('pfgApp')
	.directive('notifications',function(){
		return {
        templateUrl:'app/scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});



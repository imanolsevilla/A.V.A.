'use strict';


angular.module('pfgApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'app/scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});



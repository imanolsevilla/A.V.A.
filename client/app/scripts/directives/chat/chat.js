'use strict';


angular.module('pfgApp')
	.directive('chat',function(){
		return {
        templateUrl:'app/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});



'use strict';

angular.module('pfgApp.auth', [
  'pfgApp.constants',
  'pfgApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

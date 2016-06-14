'use strict';

angular.module('pfgApp')
  .config(function ($stateProvider,$ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });

    $stateProvider
      .state('dashboard', {
        url:'/administracion',
        templateUrl: 'app/panelAdministracion/main.html',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
            return $ocLazyLoad.load(
              {
                name:'pfgApp',
                files:[
                  'app/scripts/directives/header/header.js',
                  'app/scripts/directives/sidebar/sidebar.js',
                  'app/scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                  'app/template/template/sb-admin-2.css',
                  'app/template/template/sb-admin-2.js'
                ]
              }),
              $ocLazyLoad.load(
                {
                  name:'toggle-switch',
                  files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                  ]
                }),
              $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                }),
              $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                }),
              $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                }),
              $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                }),
              $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                }),
              $ocLazyLoad.load(
                {
                  name:'Timeline',
                  files:['app/template/template/timeline.css']
                })
          }
        },
        authenticate: true

      })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'app/panelAdministracion/panelAdministracion.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'pfgApp',
              files:[
                'app/scripts/controllers/main.js',
                'app/scripts/directives/timeline/timeline.js',
                'app/scripts/directives/chat/chat.js',
                'app/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        },
        authenticate: true
      })


      /*
      .state('dashboard.user',{
        templateUrl:'app/template/user/form.html',
        controller: 'UserCtrl',
        url:'/user',
        authenticate: true
      })
      */


      .state('dashboard.contactos',{
        templateUrl:'app/contactos/contactos.html',
        url:'/contactos',
        controller: 'ContactosController',
        /**authenticate: true*/
      })
      .state('dashboard.calendario',{
        templateUrl:'app/calendario/calendario.html',
        url:'/calendario',
        controller: '',
        authenticate: true
      })
      .state('dashboard.stock',{
        templateUrl:'app/stock/stock.html',
        url:'/stock',
        controller: '',
        authenticate: true
      })
      .state('dashboard.manuales',{
        templateUrl:'app/manuales/manuales.html',
        url:'/manuales',
        controller: '',
        authenticate: true
      })








       .state('dashboard.eventos',{
        templateUrl:'app/template/evento/form.html',
        url:'/evento',
        controller: 'EventosCtrl',
        authenticate: true
      })
       /*.state('dashboard.galeria',{
        templateUrl:'app/admin/galeria/form.html',
        url:'/galeria',
        controller: 'GaleriaCtrl',
        authenticate: true
      })
      .state('dashboard.photocall',{
        templateUrl:'app/admin/photocall/form.html',
        url:'/photocall',
        controller: 'PhotocallCtrl',
        authenticate: true
      })
      .state('dashboard.settings',{
        templateUrl:'app/admin/user/settings.html',
        url:'/settings',
        controller: 'UserCtrl',
        authenticate: true
      })
*/


      .state('dashboard.form',{
        templateUrl:'app/template/template/views/form.html',
        url:'/form'
      })
      .state('dashboard.blank',{
        templateUrl:'app/template/template/views/pages/blank.html',
        url:'/blank'
      })
      .state('loginn',{
        templateUrl:'app/template/template/views/pages/login.html',
        url:'/loginn'
      })
      .state('dashboard.chart',{
        templateUrl:'app/template/template/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
              $ocLazyLoad.load({
                name:'eginBookApp',
                files:['app/scripts/controllers/chartContoller.js']
              })
          }
        }
      })
      .state('dashboard.table',{
        templateUrl:'app/template/template/views/table.html',
        url:'/table'
      })
      .state('dashboard.panels-wells',{
        templateUrl:'app/template/template/views/ui-elements/panels-wells.html',
        url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'app/template/template/views/ui-elements/buttons.html',
        url:'/buttons'
      })
      .state('dashboard.notifications',{
        templateUrl:'app/template/template/views/ui-elements/notifications.html',
        url:'/notifications'
      })
      .state('dashboard.typography',{
        templateUrl:'app/template/template/views/ui-elements/typography.html',
        url:'/typography'
      })
      .state('dashboard.icons',{
        templateUrl:'app/template/template/views/ui-elements/icons.html',
        url:'/icons'
      })
      .state('dashboard.grid',{
        templateUrl:'app/template/template/views/ui-elements/grid.html',
        url:'/grid'
      })

  });

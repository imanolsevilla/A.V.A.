/**
 * Created by imanol on 7/06/16.
 */
'use strict';

angular.module('pfgApp')
  .controller('ContactosController',function ($scope, $uibModal) {

    /**tipocontacto1:empleado/a, tipocontacto2:modelo, tipocontacto3:contacto de interes */

    $scope.contactos = [
      {
        id:1,
        tipocontacto:2,
        nombre:'Iasd',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de zara',
        tipo2: 170
      },
      {
        id:2,
        tipocontacto:1,
        nombre:'Imadfgl',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de drdb',
        tipo2: 192
      },
      {
        id:3,
        tipocontacto:3,
        nombre:'Imangjghol',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: '22987431T',
        tipo2: undefined
      },
      {
        id:4,
        tipocontacto:2,
        nombre:'Imaererrenol',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de channel',
        tipo2: 'mucha experiencia'
      },
      {
        id:5,
        tipocontacto:3,
        nombre:'Imanjjjkghol',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: '22987431T',
        tipo2: undefined
      },
      {
        id:6,
        tipocontacto:1,
        nombre:'Imabcbnol',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: '22987431T',
        tipo2: 'mucha experiencia'
      },
      {
        id:7,
        tipocontacto:2,
        nombre:'Imanityuol',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de brownie',
        tipo2: 80
      },
      {
        id:8,
        tipocontacto:2,
        nombre:'Imanoqweqwel',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de manos',
        tipo2: 165
      },
    ];

    /** */

    /** Funcionalidad tabla */
   
    /** Fin funcionalidad tabla */


    /** Modales */
    $scope.animationsEnabled = true;

    $scope.abrirmodal = function(){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl:'myModalContent.html',
        controller: 'ModalInstanceCtrl'
      });
    };



    $scope.borrarmodal = function(){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl:'myModalContentBorrar.html',
        controller: 'ModalInstanceCtrl'
      });
    };



  });

angular.module('pfgApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  /** Fin modales */



});

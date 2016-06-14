'use strict';

angular.module('pfgApp')
  .controller('EventosCtrl', function ($scope, Evento, $http, fileReader) {
    $scope.errors = {};
    $scope.evento ={};
    var eventoTmp ={};
    var tamMax = 800; //tamaño en kb
    var tiposAceptados = {};

    $scope.eventos = Evento.query();

    console.log(fileReader);
    $scope.getFile = function (target) {
      $scope.progress = 0;
      fileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
          if(target==="logo")
            $scope.imageSrc = result;
          if(target==="logoAct")
            $scope.imageSrcAct = result;
        });
    };

    $scope.delete = function(evento) {
      Evento.remove({ id: evento.id });
      angular.forEach($scope.eventos, function(e, i) {
        if (e === evento) {
          if($scope.eventoAct === evento){
            $scope.eventoAct=null;
            $scope.showData="";
          }
          $scope.eventos.splice(i, 1);
        }
      });
    };

    $scope.new = function(logoFile) {

      if($scope.comprobarCampo("new")) {


        var datt = moment($scope.data.dateDropDownInput);
        datt.hours(15);

        console.log("fecha: " + $scope.data.dateDropDownInput)
        uploadLogo(logoFile, $scope.evento.name, $scope.evento.desc, $scope.evento.fb, $scope.evento.horarios, datt, $scope.evento.autobus, $http).success(function (uploadResponse) {
          // Handle response from server
          console.log(uploadResponse);
          $scope.alerts = [
            {type: 'success', msg: 'Evento añadido correctamente.'}
          ];
          $scope.eventos.push(uploadResponse);
          $scope.evento=null;
          $scope.imageSrc=null;
          $scope.data.dateDropDownInput="";
          $('#logo').val('');


          //$scope.eventos = Evento.query();
        }).error(function (error) {
          // Handle error from server
          $scope.errors = [
            {type: 'error', msg: 'Se ha producido algun problema a la hora de crear el evento. Por favor reintentelo.'},
          ];
          console.log(err.stack);
        });
      }else{
        console.log("Se ha producido algun error");
      }
    };

    $scope.modificarDatos = function (logoFile){

      //var fff = new Date(Date.parse($scope.eventoAct.fecha)).toString();
      if($scope.comprobarCampo("update")) {

        var dt = moment($scope.eventoAct.fecha);
        dt.hours(15);
        console.log(dt);


        var formData = new FormData();
        if (logoFile) {
          formData.append("file", logoFile);
        }
        formData.append("id", eventoTmp.id);
        formData.append("name", $scope.eventoAct.name);
        formData.append("desc", $scope.eventoAct.desc);
        formData.append("fb", $scope.eventoAct.fb);
        formData.append("horarios", $scope.eventoAct.horarios);
        formData.append("fecha", dt);
        formData.append("autobus", $scope.eventoAct.autobus);
        $http.post('/api/eventos/update', formData, {
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        })
          .then(function (evento) {
            $scope.alerts = [
              {type: 'success', msg: 'Evento modificado correctamente.'}
            ];
            angular.forEach($scope.eventos, function (e, i) {
              if (e.id === eventoTmp.id) {
                $scope.eventoAct = null;
                $scope.showData = "";
                $scope.eventos.splice(i, 1, evento.data);
                $('#logoAct').val('');
                $scope.imageSrcAct=null;
              }
            });
          })
          .catch(function () {
            $scope.errors = [
              {
                type: 'error',
                msg: 'Se ha producido algun problema a la hora de modificar el evento. Por favor reintentelo.'
              }
            ];

          });
      }else{
        console.log("Se ha producido algun error");
      }

      //$window.location.reload();
    };

    $scope.muestraEvento = function (evento){
      $scope.eventoAct = evento;
      $scope.eventoAct.fecha = new Date(moment(evento.fecha));
      eventoTmp = evento;
    };


    $scope.checkimage = function(logo) {

      var reader = new FileReader();
      var image  = new Image();

      reader.readAsDataURL(logo.files[0]);
      reader.onload = function(_logo) {
        image.src    = _logo.target.result;              // url.createObjectURL(file);
        image.onload = function() {
          var w = this.width,
            h = this.height,
            t = logo.files[0].type,                           // ext only: // file.type.split('/')[1],
            n = logo.name,
            s = ~~(logo.files[0].size/1024) +'KB';
          $scope.foto = this.src;
        };
        image.onerror= function() {
          alert('Invalid file type: '+ file.type);
        };
      };
    };

    $scope.comprobarCampo = function(e) {
      $scope.name={};
      $scope.desc={};
      $scope.fecha={};
      $scope.file={};
      $scope.nameAct={};
      $scope.descAct={};
      $scope.fechaAct={};
      $scope.fileAct={};


      var bol = true;


      if(e==="new"){
        if (!$scope.evento.desc) {
          $scope.desc.cssClass = 'has-error';
          $scope.desc.helpText = 'Descripcion es requerido.';
          bol=false;

        } else if ($scope.evento.desc.length >= 250) {
          $scope.desc.cssClass = 'has-error';
          $scope.desc.helpText = 'Descripcion es demasiado largo.';
          bol=false;
        }else {
          $scope.desc.cssClass = '';
          $scope.desc.helpText = '';
        }
        if(!moment($scope.data.dateDropDownInput).isValid()){
          $scope.fecha.cssClass = 'has-error';
          $scope.fecha.helpText = 'Fecha incorrecta.';
          bol=false;
        }
        if (!$scope.evento.name) {
          $scope.name.cssClass = 'has-error';
          $scope.name.helpText = 'Titulo es requerido.';
          bol = false;

        } else if ($scope.evento.name.length >= 50) {
          $scope.name.cssClass = 'has-error';
          $scope.name.helpText = 'Titulo es demasiado largo.';
          bol = false;

        } else {
          $scope.name.cssClass = '';
          $scope.name.helpText = '';
        }
        if( !$scope.imageSrc){
          $scope.file.cssClass = 'has-error';
          $scope.file.helpText = 'Fichero es requerido.';
          bol=false;
        }else{
          console.log("Tamaño fichero: "+~~($scope.logoFile.size/1024));
          if(~~($scope.logoFile.size/1024)> tamMax){
            $scope.file.cssClass = 'has-error';
            $scope.file.helpText = 'El tamaño del fichero no puede superor a 800 KB.';
            bol=false;
          }
        }
        return bol;
      }else
      if(e==="update"){
        if (!$scope.eventoAct.desc) {
          $scope.descAct.cssClass = 'has-error';
          $scope.descAct.helpText = 'Descripcion es requerido.';
          bol=false;

        } else if ($scope.eventoAct.desc.length >= 250) {
          $scope.descAct.cssClass = 'has-error';
          $scope.descAct.helpText = 'Descripcion es demasiado largo.';
          bol=false;
        }else {
          $scope.descAct.cssClass = '';
          $scope.descAct.helpText = '';
        }
        if(!moment($scope.eventoAct.fecha).isValid()){
          $scope.fechaAct.cssClass = 'has-error';
          $scope.fechaAct.helpText = 'Fecha incorrecta.';
          bol=false;
        }
        if (!$scope.eventoAct.name) {
          $scope.nameAct.cssClass = 'has-error';
          $scope.nameAct.helpText = 'Titulo es requerido.';
          bol = false;

        } else if ($scope.eventoAct.name.length >= 50) {
          $scope.nameAct.cssClass = 'has-error';
          $scope.nameAct.helpText = 'Titulo es demasiado largo.';
          bol = false;

        } else {
          $scope.nameAct.cssClass = '';
          $scope.nameAct.helpText = '';
        }
        //console.log("Tamaño fichero: "+~~($scope.logoFile.size/1024));
        if($scope.logoFile)
          if(~~($scope.logoFile.size/1024)> tamMax){
            $scope.fileAct.cssClass = 'has-error';
            $scope.fileAct.helpText = 'El tamaño del fichero no puede superor a 800 KB.';
            bol=false;
          }
        return bol;
      }else{
        var cal= e.currentTarget.name;
        console.log("evento : "+cal);

        if (cal === "name") {
          if (!$scope.evento.name) {
            $scope.name.cssClass = 'has-error';
            $scope.name.helpText = 'Titulo es requerido.';

          } else if ($scope.evento.name.length >= 50) {
            $scope.name.cssClass = 'has-error';
            $scope.name.helpText = 'Titulo es demasiado largo.';

          } else {
            $scope.name.cssClass = '';
            $scope.name.helpText = '';
          }
        }
        if (cal==="desc") {
          if (!$scope.evento.desc) {
            $scope.desc.cssClass = 'has-error';
            $scope.desc.helpText = 'Descripcion es requerido.';

          } else if ($scope.evento.desc.length >= 250) {
            $scope.desc.cssClass = 'has-error';
            $scope.desc.helpText = 'Descripcion es demasiado largo.';
          } else {
            $scope.desc.cssClass = '';
            $scope.desc.helpText = '';
          }
        }
        if(cal ==="fecha"){
          if(!moment($scope.data.dateDropDownInput).isValid()){
            $scope.fecha.cssClass = 'has-error';
            $scope.fecha.helpText = 'Fecha incorrecta.';
          }else{

          }
        }


        if (cal === "nameAct") {
          if (!$scope.eventoAct.name) {
            $scope.nameAct.cssClass = 'has-error';
            $scope.nameAct.helpText = 'Titulo es requerido.';

          } else if ($scope.eventoAct.name.length >= 50) {
            $scope.nameAct.cssClass = 'has-error';
            $scope.nameAct.helpText = 'Titulo es demasiado largo.';

          } else {
            $scope.nameAct.cssClass = '';
            $scope.nameAct.helpText = '';
          }
        }
        if (cal==="descAct") {
          if (!$scope.eventoAct.desc) {
            $scope.descAct.cssClass = 'has-error';
            $scope.descAct.helpText = 'Descripcion es requerido.';

          } else if ($scope.eventoAct.desc.length >= 250) {
            $scope.descAct.cssClass = 'has-error';
            $scope.descAct.helpText = 'Descripcion es demasiado largo.';
          } else {
            $scope.descAct.cssClass = '';
            $scope.descAct.helpText = '';
          }
        }
        if(cal ==="fecha"){
          if(!moment($scope.data.dateDropDownInput).isValid()){
            $scope.fechaAct.cssClass = 'has-error';
            $scope.fechaAct.helpText = 'Fecha incorrecta.';
          }else{

          }
        }
      }

    };

  });


function uploadLogo (logo, name, desc, fb, horarios, fecha, autobus, $http) {
  var formData = new FormData();
  formData.append("file", logo);
  formData.append("name", name);
  formData.append("desc",  desc);
  formData.append("fb", fb);
  formData.append("horarios", horarios);
  formData.append("fecha", fecha);
  formData.append("autobus",autobus);
  return $http.post('/api/eventos/', formData, {
    headers: {'Content-Type': undefined},
    transformRequest: angular.identity
  })}

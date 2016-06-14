/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Contactos              ->  index
 * POST    /api/Contactos              ->  create
 * GET     /api/Contactos/:id          ->  show
 * PUT     /api/Contactos/:id          ->  update
 * DELETE  /api/Contactos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Contactos} from '../api/';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Contactos
export function index(req, res) {
  return Contactos.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Contactos from the DB
export function show(req, res) {
  return Contactos.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Contactos in the DB
export function create(req, res) {
  return Contactos.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Contactos in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Contactos.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Contactos from the DB
export function destroy(req, res) {
  return Contactos.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//** Nuevos metodos
//
// */

exports.create = function (req, res, next) {
  models.contactos
    .create({tipocontacto: req.body.tipocontacto, nombre: req.body.nombre, apellidos: req.body.apellidos, telefono: req.body.telefono, email: req.body.email, direccion: req.body.direccion, observaciones: req.body.observaciones, tipo1: req.body.tipo1, tipo2: req.body.tipo2})
    .then(function(contactos) {
      res.status(200).json( contactos );

    }).catch(function(error) {
    console.log("Error al crear Contacto")
    console.log(error.stack);
    return validationError(res, error);
  });
};

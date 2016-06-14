/**
 * Created by imanol on 9/06/16.
 */

"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
//var env       = process.env.NODE_ENV || "development";
//var config    = require('../config/db');
var sequelize = new Sequelize('mysql://root:12345678@localhost:3306/pfg', {
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true
    //underscored: true
  }}
);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    console.log(__dirname+"/"+file);
    file = '/' + file + '/' + file + '.model.js';
    console.log(__dirname+"/"+file);
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Contacto', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,      allowNull: false,

      autoIncrement: true
    },
    tipocontacto: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    tipo1: DataTypes.STRING,
    tipo2: DataTypes.STRING

  });
}

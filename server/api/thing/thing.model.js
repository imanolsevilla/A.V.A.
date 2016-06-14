'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Thing', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,      allowNull: false,

      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}

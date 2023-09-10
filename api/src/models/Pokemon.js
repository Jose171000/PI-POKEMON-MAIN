const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    life: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attack: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    defense: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    velocity: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.FLOAT
    },
    weight: {
      type: DataTypes.FLOAT
    }

  },
    { 
      timestamps: false 
    });
};

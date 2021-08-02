const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    platforms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isMyGame: { // atributo para diferenciar entre un juego de la API rawg y uno de la BBDD
      type: DataTypes.BOOLEAN,
      set(value){
        this.setDataValue('isMyGame', true);
      }
    }
  });
};

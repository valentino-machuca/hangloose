const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    class Genre extends Model{}

    Genre.init({
        name:{
          type: DataTypes.STRING(255),
          allowNull: false,
        },
    },{
        sequelize,
        modelName: 'Genre',
        tableName: 'Genres',
        timestamps: false
    });

};

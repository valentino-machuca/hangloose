const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    class Platform extends Model{}

    Platform.init({
        name:{
          type: DataTypes.STRING(255),
          allowNull: false,
        },
    },{
        sequelize,
        modelName: 'Platform',
        tableName: 'Platforms',
        timestamps: false
    });
};

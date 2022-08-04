const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    class Videogame extends Model{}

    Videogame.init({
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name:{
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        description:{
          type: DataTypes.TEXT,
          allowNull: false,
        },
        release:{
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: 'Soon...',
        },
        rating:{
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        cover:{
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: undefined,
        },
        publisher:{
          type: DataTypes.STRING(255),
          allowNull: false,
        },
    },{
        sequelize,
        modelName: 'Videogame',
        tableName: 'Videogames',
        timestamps: false
    });
};

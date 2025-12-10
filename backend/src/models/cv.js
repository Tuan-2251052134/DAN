"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CV.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      CV.hasMany(models.Apply, {
        foreignKey: "cvId",
        as: "applys",
      });
      // define association here
    }
  }
  CV.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CV",
      timestamps: false,
    }
  );
  return CV;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      District.belongsTo(models.City, {
        foreignKey: "cityId",
        as: "city",
      });
    }
  }
  District.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      cityId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "District",
      timestamps: false,
    }
  );
  return District;
};

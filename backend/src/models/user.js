"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.District, {
        foreignKey: "districtId",
        as: "district",
      });
      User.hasMany(models.Job, {
        foreignKey: "userId",
        as: "jobs",
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      districtId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};

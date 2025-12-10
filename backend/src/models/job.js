"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Job.belongsTo(models.Type, {
        foreignKey: "typeId",
        as: "type",
      });
      Job.hasOne(models.Message, {
        foreignKey: "id",
        as: "message",
      });
    }
  }
  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      createdDate: DataTypes.DATE,
      description: DataTypes.STRING,
      payment: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expiredDate: DataTypes.DATE,
      status: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Job",
      timestamps: false,
    }
  );
  return Job;
};

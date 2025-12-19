"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apply.belongsTo(models.CV, {
        foreignKey: "jobSeekerId",
        as: "cv",
      });
      Apply.belongsTo(models.User, {
        foreignKey: "jobSeekerId",
        as: "jobSeeker",
      });

      Apply.belongsTo(models.Job, {
        foreignKey: "jobId",
        as: "job",
      });
    }
  }
  Apply.init(
    {
      createdDate: DataTypes.DATE,
      jobSeekerId: DataTypes.INTEGER,
      jobId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Apply",
      tableName: "Applys",
      timestamps: false,
    }
  );
  return Apply;
};

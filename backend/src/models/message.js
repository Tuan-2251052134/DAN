"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Job, { foreignKey: "id", as: "job" });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
      timestamps: false,
    }
  );
  return Message;
};

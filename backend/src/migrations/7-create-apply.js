"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Applys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cvId: {
        type: Sequelize.INTEGER,
        references: {
          model: "CVs",
          key: "id",
        },
        allowNull: false,
      },
      jobId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Applys");
  },
};

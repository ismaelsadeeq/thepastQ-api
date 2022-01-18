'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faculties', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type:Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('faculties');
  }
};
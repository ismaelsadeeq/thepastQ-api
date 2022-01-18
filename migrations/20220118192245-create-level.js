'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('levels', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type:Sequelize.UUID
      },
      departmentId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'departments',
          key:'id',
          as:'departmentId'
        }
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('levels');
  }
};
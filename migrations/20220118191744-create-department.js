'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('departments', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type:Sequelize.UUID
      },
      facultyId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'faculties',
          key:'id',
          as:'facultyId'
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('departments');
  }
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type:Sequelize.UUID
      },
      levelId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'levels',
          key:'id',
          as:'levelId'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      semester: {
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
    await queryInterface.dropTable('courses');
  }
};
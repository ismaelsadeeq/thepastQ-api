'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department extends Model {
  }
  department.associate = function(models){
    department.belongsTo(models.faculty,{
      foreignKey:'facultyId'
    })
  }
  department.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'department',
  });
  return department;
};
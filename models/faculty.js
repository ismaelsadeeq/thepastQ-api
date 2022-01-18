'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faculty extends Model {
  }
  faculty.associate = function(models){
    faculty.hasMany(models.department,{
      foreignKey:'facultyid'
    });
  }
  faculty.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'faculty',
  });
  return faculty;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
  }
  level.associate = function(models){
    level.belongsTo(models.department,{
      foreignKey:'departmentId'
    });
  }
  level.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'level',
  });
  return level;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
  }
  course.associate = function(models){
    course.belongsTo(models.level,{
      foreignKey:'levelId'
    })
  }
  course.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    semester: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'course',
  });
  return course;
};
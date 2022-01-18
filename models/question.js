'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
  }
  question.associate = function(models){
    question.belongsTo(models.question,{
      foreignKey:'courseId'
    });
  }
  question.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'question',
  });
  return question;
};
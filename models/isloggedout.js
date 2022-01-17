'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class isLoggedOut extends Model {
  }
  isLoggedOut.associate = function(models){
    isLoggedOut.belongsTo(models.user,{
      foreignKey:'userId'
    });
  }
  isLoggedOut.init({
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid:true,
    modelName: 'isLoggedOut',
  });
  return isLoggedOut;
};
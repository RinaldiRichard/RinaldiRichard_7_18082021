'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'userId'}) 
    }
  };
  Message.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "message",
    modelName: 'Message',
  });
  return Message;
};
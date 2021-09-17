"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Message }) {
      this.hasMany(Message, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

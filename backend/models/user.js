"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Message }) {
      this.hasMany(Message, { foreignKey: "userId" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  User.init(
    {
      
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le nom ne doit pas être null! " },
          notEmpty: { msg: "Le nom doit être renseigné! " },
        },
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le prenom ne doit pas être null! " },
          notEmpty: { msg: "Le prenom doit être renseigné! " },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le prenom ne doit pas être null! " },
          notEmpty: { msg: "Le prenom doit être renseigné! " },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "L'email ne doit pas être null! " },
          notEmpty: { msg: "L'email' doit être renseigné! " },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Le mot de passe ne doit pas être null! " },
          notEmpty: { msg: "Le mot de passe doit être renseigné! " },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

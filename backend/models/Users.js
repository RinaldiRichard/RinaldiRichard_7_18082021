module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // //les posts peuvent avoir plusieurs comentaires (hasMany) et à la suppression du post, ca supprime les commentaires associés (onDelete:"cascade")
  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // };
  return Users;
};

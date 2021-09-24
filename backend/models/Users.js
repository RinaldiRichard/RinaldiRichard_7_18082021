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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

   //les users peuvent avoir plusieurs posts (hasMany) et à la suppression du user, ca supprime les posts associés (onDelete:"cascade")
   Users.associate = (models) => {
     Users.hasMany(models.Posts, {
       onDelete: "cascade",
     });
   };
  return Users;
};

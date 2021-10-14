module.exports = (sequelize, DataTypes) => {
  const PostsText = sequelize.define("PostsText", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  //les posts peuvent avoir plusieurs comentaires (hasMany) et à la suppression du post, ca supprime les commentaires associés (onDelete:"cascade")
  PostsText.associate = (models) => {
    PostsText.hasMany(models.CommentsText, {
      onDelete: "cascade",
    });
  };
  
  return PostsText;
};

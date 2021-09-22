module.exports = (sequelize, DataTypes) => {


    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    //les posts peuvent avoir plusieurs comentaires (hasMany) et à la suppression du post, ca supprime les commentaires associés (onDelete:"cascade")
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        })
    }
    return Posts
}
module.exports = (sequelize, DataTypes) => {
    const CommentsText = sequelize.define("CommentsText", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return CommentsText;
  };
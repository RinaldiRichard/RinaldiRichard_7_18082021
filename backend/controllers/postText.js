const { PostsText } = require("../models");

exports.create = async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id
  await PostsText.create(post);
  res.json(post);
};

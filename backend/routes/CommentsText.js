const express = require("express");
const router = express.Router();
const { CommentsText } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await CommentsText.findAll({
    where: {
      PostsTextId: postId,
    },
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username;
  await CommentsText.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  //Suppression dans la BDD où id = commentId
  await CommentsText.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("commentaire supprimé!");
});
module.exports = router;

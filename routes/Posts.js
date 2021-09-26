const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id); // recherche d'un post par primary key -> l'id
  res.json(post);
});
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({ where: { UserId: id } });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;

  //fonctionnalité de sequelize qui permet de selectionner le champ a mettre a jour et la localisation spécifique (l'id du post pour ce cas là)
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

router.put("/description", validateToken, async (req, res) => {
  const { newText, id } = req.body;

  //fonctionnalité de sequelize qui permet de selectionner le champ a mettre a jour et la localisation spécifique (l'id du post pour ce cas là)
  await Posts.update({ description: newText }, { where: { id: id } });
  res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  //Suppression dans la BDD où id = commentId
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("message supprimé!");
});
module.exports = router;

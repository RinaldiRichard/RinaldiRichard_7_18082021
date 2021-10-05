const express = require("express");
const router = express.Router();
const { PostsText } = require("../models/");
const { validateToken } = require("../middlewares/AuthMiddleware");
const postCtrl = require('../controllers/postText')

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await PostsText.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostsText.findByPk(id); // recherche d'un post par primary key -> l'id
  res.json(post);
});

router.post("/",validateToken, postCtrl.create);

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;

  //fonctionnalité de sequelize qui permet de selectionner le champ a mettre a jour et la localisation spécifique (l'id du post pour ce cas là)
  await PostsText.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

router.put("/description", validateToken, async (req, res) => {
  const { newText, id } = req.body;

  //fonctionnalité de sequelize qui permet de selectionner le champ a mettre a jour et la localisation spécifique (l'id du post pour ce cas là)
  await PostsText.update({ description: newText }, { where: { id: id } });
  res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  //Suppression dans la BDD où id = commentId
  await PostsText.destroy({
    where: {
      id: postId,
    },
  });
  res.json("message supprimé!");
});
module.exports = router;

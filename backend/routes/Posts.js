const express = require("express");
const router = express.Router();
const {Posts} = require("../models/");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post')




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

router.post("/",validateToken, multer,  postCtrl.create);

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

router.delete("/:postId", validateToken, postCtrl.deletePostImg);





module.exports = router;
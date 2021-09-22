const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id",  async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id); // recherche d'un post par primary key -> l'id
  res.json(post);
});

router.post("/",validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username
  await Posts.create(post);
  res.json(post);
});

router.delete('/:postId', validateToken, async(req,res) => {
const postId = req.params.postId
//Suppression dans la BDD où id = commentId
await Posts.destroy({where: {
  id: postId
}})
res.json("message supprimé!")
})
module.exports = router;

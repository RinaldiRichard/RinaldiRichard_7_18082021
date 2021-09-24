const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    // Création d'une ligne dans la table users avec le username envoyé + password hashé
    Users.create({
      username: username,
      password: hash,
    });
    res.json("OK");
  });
});

router.get('/', validateToken, async (req,res) => {
  const listOfMembers = await Users.findAll()
  res.json(listOfMembers)
})
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Recherche d'un user avec le username
  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  // Si user non trouvé
  if (!user) res.json({ error: "L'utilisateur n'existe pas" });

  // Comparaison entre password rentré et password de user dans BDD
  bcrypt.compare(password, user.password).then((comparaison) => {
    if (!comparaison) res.json({ error: "Mot de passe invalide" });
    const accessToken = sign(
      { username: user.username, id: user.id },
      "random_secret_token"
    );
    res.json({ token: accessToken, username: username, id: user.id });
    console.log(res.data); // pour vérifier l'envoie des bonnes infos
  });
});

//Permet la vérification de la validation du token d'acces
router.get("/authvalidate", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  // recherche d'un post par primary key -> l'id, tout en excluant le password
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Accès aux infos de user grace au middleware validateToken
  const user = await Users.findOne({ where: { username: req.user.username } });
  bcrypt.compare(oldPassword, user.password).then((comparaison) => {
    if (!comparaison) res.json({ error: "Ancien mot de passe invalide" });
    
    //hash du newPassword
    bcrypt.hash(newPassword, 10).then((hash) => {
      // Mise à jour du password dans la BDD
      Users.update({password: hash},{where: {username: req.user.username}})
      res.json("Password modifié");
    });
  });
});

router.put('/admin', validateToken, async (req,res)=> {
  
})

router.delete("/:id", validateToken, async (req, res) => {
  
  //Suppression dans la BDD où id = commentId
  await Users.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json("utilisateur supprimé!");
});
module.exports = router;

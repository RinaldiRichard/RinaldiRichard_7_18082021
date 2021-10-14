const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const checkEmail = require("../middlewares/Checkmail")

router.post("/",checkEmail, async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    // Création d'une ligne dans la table users avec le username envoyé + password hashé
    Users.create({
      username: username,
      email: email,
      password: hash,
    });
    res.json("OK");
  });
});

router.get("/", validateToken, async (req, res) => {
  const listOfMembers = await Users.findAll();
  res.json(listOfMembers);
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
router.post("/login", async (req, res) => {
  const { username, password, email } = req.body;

  // Recherche d'un user avec le username
  const user = await Users.findOne({
    where: {
      username: username,
    },
  });
  const userMail = await Users.findOne({
    where: {
      email: email,
    },
  });
  
  

  // Si user non trouvé
  if (!user) {
    res.json({ error: "Nom d'utilisateur incorrect" });
  } else if (!userMail) {
    res.json({ error: "Adresse mail non valide" });
  } else {
    // Comparaison entre password rentré et password de user dans BDD
    bcrypt.compare(password, user.password).then((comparaison) => {
      if (!comparaison) {
        res.json({ error: "Mot de passe invalide" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id, email: user.email },
          "random_secret_token"
        );
        res.json({
          token: accessToken,
          username: username,
          id: user.id,
          email: user.email,
        });
        //console.log(res.data); // pour vérifier l'envoie des bonnes infos
      }
    });
  }
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Accès aux infos de user grace au middleware validateToken
  const user = await Users.findOne({ where: { email: req.user.email } });
  bcrypt.compare(oldPassword, user.password).then((comparaison) => {
    if (!comparaison) {
      res.json({ error: "Ancien mot de passe invalide" });
    } else {
      //hash du newPassword
      bcrypt.hash(newPassword, 10).then((hash) => {
        // Mise à jour du password dans la BDD
        Users.update({ password: hash }, { where: { email: req.user.email } });
        res.json("Password modifié");
      });
    }
  });
});

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

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
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;

const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async(req, res, next)
  // vérification que tous les champs sont remplis

  .then(
    // vérification si l'user existe dans la DB
    User.findOne({ email: req.body.email })
      .then((userFound) => {
        // si l'utilisateur n'existe pas la DB
        if (!userFound) {
          const { nom, prenom, email, password } = req.body;

          // Hash du mot de passe avec bcrypt
          bcrypt.hash(password, 10).then((hash) => {
            try {
              const user = await User.create({ nom, prenom, email, hash });

              return res.json(user);
            } catch (err) {
              console.log(err);
              return res.status(500).json(err);
            }
          });
        } else if (userFound) {
          return res.status(409).json({ error: "L'utilisateur existe déjà !" });
        }
      })
      .catch((error) => res.status(500).json({ error }))
  )
  .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
  });

// Connexion d'utilisateur enregistré
exports.login = (req, res, next) => {
  // Recherche de l'utilisateur dans la base de données
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Si on ne trouve pas l'utilisateur
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }

      // On compare le mot de passe de la requete avec celui de la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            userAdmin: user.isAdmin,

            // Création d'un token pour sécuriser le compte de l'utilisateur
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin,
              },
              "RANDOM_SECRET_TOKEN",
              { expiresIn: "8h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

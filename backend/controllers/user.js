const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize, User } = require("../models");

exports.signup = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
        username: req.body.username,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((err) => res.status(500).json({ error: "oups soucis avec le signup" }));
};

exports.login = (req, res) => {
  User.findOne({
    where: { username: req.body.username },
    attributes: ["username", "password"],
  })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ error: "Utilisateur non trouvé." });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log("Wrong password");
            return res.status(401).json({ error: "Mot de passe erroné." });
          }

          console.log("User logged in.");
          res.status(200).json({
        
            username: user.username,
            token: jwt.sign(
              { username: user.username },
              `RANDOM_SECRET_TOKEN`,    // A défénir avec une variable env par la suite
              { expiresIn: "8h" }
            ),
          });
          console.log("test");
        })
        .catch((error) => res.status(500).json({ error: "oups soucis avec le login" }));
    })
    .catch((error) => res.status(500).json({ error: "oups soucis avec le login 2" }));
};
exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "qqch s'est mal passé findOne user" });
  }
};
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
console.log(res.json(users))
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "qqch s'est mal passé getAll user" });
  }
};
exports.modification = async (req, res) => {
  const id = req.params.id;
  const { username, nom, prenom, email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { id },
    });
    user.username = username 
    user.nom = nom 
    user.prenom = prenom 
    user.email = email 
    user.password = password

    await user.save();
    
    return res.json({message:"Utilisateur modifié avec succès"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "qqch s'est mal passé put" });
  }
};
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });
    await user.destroy();
    return res.json({ message: "utilisateur supprimé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "utilisateur introuvable" });
  }
};

exports.getProfil = (req, res) => {
	User.findOne({where: {username: req.params.username}})
		.then(user => {
            console.log("give profile ")
			return res.status(200).json({user});
		})
		.catch(err =>  res.status(400).json({err}))
};

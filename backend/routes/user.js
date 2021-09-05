//Importation
const express = require("express");
const router = express.Router();
const { sequelize, User, Message } = require("../models");
const userCtrl = require('../controllers/user')

router.post("/users/signup", userCtrl.signup)
router.post("/users/login", userCtrl.login)

router.get("/users", userCtrl.getAll);

router.get("/users/:id", userCtrl.getOne);

router.delete("/users/:id", userCtrl.delete);

router.put("/users/:id", userCtrl.modification);






router.get("/messages/:userId", async (req, res) => {
  const userid = req.params.userId;
  try {
    const message = await Message.findOne({
      where: { userid },
    });

    return res.json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "qqch s'est mal passé recup 1 message selon id" });
  }
});
router.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Message.findOne({
      where: { id },
    });
    await user.destroy();
    return res.json({ message: "message supprimé" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "message introuvable" });
  }
});

router.put("/messages/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body.body;
  try {
    const message = await Message.findOne({
      where: { id },
    });
    message.body = body;
    await message.save();
    return res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "qqch s'est mal passé message put" });
  }
});

module.exports = router;

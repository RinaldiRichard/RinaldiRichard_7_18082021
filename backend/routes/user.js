//Importation
const express = require("express");
const router = express.Router();
const { Message } = require("../models");
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth')
const checkEmail = require("../middleware/checkEmail")

router.post("/users/signup",checkEmail, userCtrl.signup);

router.post("/users/login", userCtrl.login);

router.get("/users",   userCtrl.getAll);

router.get("/users/:id", userCtrl.getOne);

router.delete("/users/:id",auth,   userCtrl.delete);

router.put("/users/:id", auth, userCtrl.modification);

router.get("/users/profil", userCtrl.getProfil)



module.exports = router;

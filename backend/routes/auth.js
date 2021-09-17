const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authCtrl");

router.post("users/signup", authCtrl.signup);
router.post("users/login", authCtrl.login);

module.exports = router;

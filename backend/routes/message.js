//Importation
const express = require("express");
const router = express.Router();
const messageCtrl = require('../controllers/message')









 //messageCtrl.create);
router.post("/messages/",messageCtrl.create)
router.get("/messages/", messageCtrl.getAll)
router.get("messages/username", messageCtrl.getPostUsername)


module.exports = router
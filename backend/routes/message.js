//Importation
const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.post("/messages/",auth, messageCtrl.create);
router.get("/messages/",   messageCtrl.getAll);
router.get("/messages/:id", messageCtrl.findById);

router.delete("/messages/:id",auth, messageCtrl.delete);

router.put("/messages/:id",auth, messageCtrl.modify);

module.exports = router;

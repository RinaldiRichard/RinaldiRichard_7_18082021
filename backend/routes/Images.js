const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");

const fs = require("fs");



router.post("/images", multer , (req,res)=> {
    res.json(req.file.filename)
})

module.exports = router;

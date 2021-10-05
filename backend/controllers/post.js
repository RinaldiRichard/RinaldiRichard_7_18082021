const { Posts } = require("../models");

exports.create = (req, res, next) => {
  
  const postObject = req.body;
  console.log(req.file);
  const post = new Posts({
    ...postObject,
    username: req.user.username,
    UserId: req.user.id,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  
  post
    .save()
    .then(() => {
      
      console.log("AAAAAAAAAAAAAAA");
      res.status(201).json({ message: "bah enfin !" });
    })
    .catch((err) => res.status(400).json({ err }));
};

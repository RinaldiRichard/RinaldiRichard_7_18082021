const { Posts } = require("../models");

exports.create = (req, res, next) => {
  const postObject = req.body;

  const post = new Posts({
    ...postObject,
    username: req.user.username,
    UserId: req.user.id,
 
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Ok !!" });
    })
    .catch((err) => res.status(400).json({ err }));
};

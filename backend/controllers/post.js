const { Posts } = require("../models");
const fs = require("fs");

exports.create = (req, res, next) => {
  const postObject = req.body;
  console.log(req.file);
  const post = new Posts({
    ...postObject,
    username: req.user.username,
    UserId: req.user.id,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then(() => {
      console.log("AAAAAAAAAAAAAAA");
      res.status(201).json({ message: "bah enfin !" });
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deletePostImg = (req, res, next) => {
  const postId = req.params.postId;
  Posts.findOne({ postId }).then((post) => {
    const filename = post.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      Posts.destroy({
        where: {
          id: postId,
        },
      });
      res.json("message supprimé!");
    });
  });
};
async (req, res) => {
  const postId = req.params.postId;
  //Suppression dans la BDD où id = commentId

  res.json("message supprimé!");
};

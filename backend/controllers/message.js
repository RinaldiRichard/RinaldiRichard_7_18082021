const { Message, User } = require("../models");

exports.create = async (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((username) => {
      if (!username) {
        console.log("User not found");
        return res.status(400).json({ error: "Utilisateur non trouvé." });
      }
      return username.createMessage(req.body);
    })
    .then(() => {
      console.log("Post inserted");
      res.status(201).json({ message: "Post enregistré" });
    })
    .catch((err) => {
      try {
        console.log(
          "Unable to create post : \n" + err.name + ".\n" + err.parent.text
        );
      } catch {
        console.log(err);
      }
      res.status(500).json({ err });
    });
};

exports.getAll = async (req, res) => {
  try {
    const messages = await Message.findAll({});

    return res.json(messages);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "qqch s'est mal passé recup all message" });
  }
};
exports.findById = (req, res) => {
  Message.findOne({ where: { id: req.params.id } })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};
exports.delete = async (req, res) => {
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
};
exports.modify = async (req, res) => {
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
};

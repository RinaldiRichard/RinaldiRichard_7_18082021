const express = require("express");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const cors = require('cors')
const { sequelize, Message, User } = require("./models");


const app = express();
app.use(express.json());
app.use(cors())

//Pas de route dans ce middleware car il sera apliqué à toutes les requêtes envoyées au serveur
app.use((req, res, next) => {
  // L'origine qui a le droit d'acces est -> tout le monde via le "*"
  res.setHeader("Access-Control-Allow-Origin", "*");

  //On donne l'autorisation d'utiliser certains headers (origin, content, accept...)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // on donne l'autorisation d'utiliser certaines méthodes (get, post, delete...)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/", userRoutes);
app.use("/api/", messageRoutes);


module.exports = app;

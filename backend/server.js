const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("uploads"));

const db = require("./models");

//routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const postTextRouter = require("./routes/PostsText");
app.use("/poststext", postTextRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const commentsTextRouter = require("./routes/CommentsText");
app.use("/commentstext", commentsTextRouter);

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

app.use("/images", express.static(path.join(__dirname, "images")));

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Listening on port 3001");
  });
});

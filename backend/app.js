// imports
const express = require('express');
const path = require('path');


// import des routes

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

// lancement de l'application express
const app = express();

// parse requètes de content-type - application/json
app.use(express.json());

// parse requètes de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// appel des models dans la DB
const db = require('./models')
db.sequelize.sync();

// gestion CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});




// enregistrement des routeurs
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

// export de notre app
module.exports = app;
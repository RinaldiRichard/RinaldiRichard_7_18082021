const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
      
    const decodedToken = jwt.verify(token, `RANDOM_SECRET_TOKEN`);
    const username = decodedToken.username;
    console.log(username);

    if (req.body.username && req.body.username !== username) {
      throw "Invalid username";
    } else {
      next();
    }
  } catch (error) {
    console.log("Authentication error :");
    console.log(error);
    res.status(403).json({ error: error | "Requête non authentifiée !" });
  }
};

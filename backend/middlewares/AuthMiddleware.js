const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accesstoken");

  if (!accessToken) return res.json({ error: "Utilisateur non authentifié" });

  try {
    const validToken = verify(accessToken, "random_secret_token");
    req.user = validToken
    if (validToken) {
      return next();
    }
  } catch (err) {
      return res.json({error: err})
  }
};

module.exports = {validateToken}

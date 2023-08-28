const jwt = require("jsonwebtoken");
const config = process.env;

const varifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res.status(403).send("Token is required for auyhentication");
  try {
    const decoded = await jwt.verify(token, config.TOKENN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = varifyToken;

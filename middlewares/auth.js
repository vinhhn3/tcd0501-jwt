const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Not Authorized");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
  }

  return next();
};

module.exports = verifyToken;

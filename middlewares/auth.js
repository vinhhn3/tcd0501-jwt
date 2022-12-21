const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;
const httpStatus = require("http-status");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Not Authorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Invalid token", error: error });
  }

  return next();
};

module.exports = verifyToken;

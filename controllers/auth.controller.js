const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const register = async (req, res) => {
  try {
    // Get input
    const { first_name, last_name, email, password } = req.body;

    // Validate input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send({ message: "All input must be valid" });
    }
    // Validate if user is already registered
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "User already registered" });
    }
    // Encrypt password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create a new user in database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // Create a JWT token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    user.token = token;
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "All input validation failed" });
    }
    // Valide if user is already exiting
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User not found" });
    }
    // Validate password with the password stored in the database
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Password is incorrect" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    user.token = token;
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = {
  register,
  login,
};

require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// Import User context
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

app.post("/register", async (req, res) => {
  // Get input
  const { first_name, last_name, email, password } = req.body;

  // Validate input
  if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input must be valid");
  }
  // Validate if user is already registered
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(400).send("User already registered");
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
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
  user.token = token;
  res.status(200).send(user);
});

// Login
app.post("/login", (req, res) => {});
module.exports = app;

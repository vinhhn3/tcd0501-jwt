require("dotenv").config();
require("./config/database").connect();
const express = require("express");

// Import User context
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

// Register

app.post("/register", async (req, res) => {
  try {
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
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input validation failed");
    }
    // Valide if user is already exiting
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("User not found");
    }
    // Validate password with the password stored in the database
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).send("Password is incorrect");
    }
    // Generate JWT token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;

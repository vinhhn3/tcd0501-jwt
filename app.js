require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// Import User context
const User = require("./model/user");

// Register
app.post("/register", (req, res) => {});

// Login
app.post("/login", (req, res) => {});
module.exports = app;

require("dotenv").config();
require("./config/database").connect();
const database = require("./config/database");
const express = require("express");

// Import User context

const routes = require("./routes");
const app = express();
const cors = require("cors");
const ApiError = require("./utils/ApiError");
app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;

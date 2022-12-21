require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const ApiError = require("./utils/ApiError");

const app = express();
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

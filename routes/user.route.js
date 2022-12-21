const express = require("express");
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/welcome", auth, userController.user);

module.exports = router;

const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email-controller");

router.get("/", emailController.forgotPassword);

module.exports = router;

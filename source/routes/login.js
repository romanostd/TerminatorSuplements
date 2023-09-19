const express = require("express");
const router = express.Router();
const lgoinController = require("../controllers/login-controller");

router.post("/", lgoinController.login );

module.exports = router;
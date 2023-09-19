const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-conroller");

router.get("/", usersController.getUsers);

router.get("/:user_id", usersController.getUserById);

router.post("/", usersController.saveUser );

router.put("/", usersController.updateUser );

router.delete("/:user_id", usersController.deleteUser);

module.exports = router;

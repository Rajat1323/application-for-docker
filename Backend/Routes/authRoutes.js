const express = require("express");
const router = express.Router();
const auth_controller = require('../Controllers/auth_controller');

//route for login
router.post("/login",auth_controller.login);
router.post("/register",auth_controller.register);

module.exports = router;
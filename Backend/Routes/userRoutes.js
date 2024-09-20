const express = require("express");
const router = express.Router();
const user_controller = require('../Controllers/user_controllers');
const checkAuth = require('../Middlewire/checkAuth');

router.use(checkAuth);
//apis
//fatch all user
router.get("/",user_controller.index);
//fatch user by id
router.get("/:id", user_controller.userById);
// patch user details
router.patch("/:id",user_controller.update);
// delete user
router.delete("/:id",user_controller.drop);
// add user
router.post("/", user_controller.save);

//router.post("/verify",auth_controller.verify);

module.exports = router;
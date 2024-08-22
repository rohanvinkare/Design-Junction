const express = require("express");
const router = express();

const authMiddleware = require("../middlewares/auth-middleware.js");
const authController = require("../controllers/auth-controller.js");


const {
  registerValidator,
  loginValidator,
} = require("../helpers/user-validator-helpers.js");

router.post("/register", registerValidator, authController.registerUser);
router.post("/login", loginValidator, authController.loginUser);
router.post('/logout', authController.logoutUser);


//Authenticated Routes 
router.get("/profile", authMiddleware, authController.getProfile);


router.get("/refresh-permissions", authMiddleware, authController.getUserPermissions);

module.exports = router;

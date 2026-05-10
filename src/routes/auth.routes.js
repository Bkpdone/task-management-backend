const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const { signupSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.me);

module.exports = router;

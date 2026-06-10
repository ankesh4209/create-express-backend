const express = require("express");
const { register, login, getProfile } = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/user.validation");

const router = express.Router();

// Register
router.post("/register", validate(registerSchema), register);

// Login
router.post("/login", validate(loginSchema), login);

// Get current user
router.get("/me", authMiddleware, getProfile);

module.exports = router;

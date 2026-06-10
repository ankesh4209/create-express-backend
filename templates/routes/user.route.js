const express = require("express");
const { register, login, getProfile } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getProfile);

module.exports = router;

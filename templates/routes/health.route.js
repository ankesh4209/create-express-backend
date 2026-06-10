const express = require("express");
const { getHealth } = require("../controllers/health.controller");

const router = express.Router();

// Health Check Endpoint
router.get("/", getHealth);

module.exports = router;

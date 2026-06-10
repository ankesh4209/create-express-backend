const { registerUser, loginUser } = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler.util");

const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({
    success: true,
    user: result.user,
    token: result.token,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(200).json({
    success: true,
    user: result.user,
    token: result.token,
  });
});

const getProfile = asyncHandler(async (req, res) => {
  // req.user is already fetched and populated by authMiddleware
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = { register, login, getProfile };

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token.");
    }
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired.");
    }
    throw error;
  }
};

module.exports = { authenticate };

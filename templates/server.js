require("dotenv").config();
const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const { Server } = require("socket.io");

const userRoute = require("./routes/user.route");
const healthRoute = require("./routes/health.route");
const requestLogger = require("./middlewares/logger.middleware");
const connectDB = require("./config/database");

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRoute);
app.use("/api/health", healthRoute);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend Running 🚀" });
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("message", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };

const mongoose = require("mongoose");

/**
 * Health check controller.
 * Evaluates process uptime, memory footprint, environment, and MongoDB connection health.
 * Returns HTTP 200 if healthy, and HTTP 503 if database connection is down/degraded.
 */
const getHealth = async (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  
  // Connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const isDatabaseHealthy = mongoStatus === 1;

  const healthData = {
    status: isDatabaseHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: `${process.uptime().toFixed(2)}s`,
    process: {
      pid: process.pid,
      memoryUsage: {
        rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(process.memoryUsage().external / 1024 / 1024).toFixed(2)} MB`,
      },
    },
    database: {
      status: isDatabaseHealthy ? "connected" : "disconnected",
      stateCode: mongoStatus,
    },
  };

  if (!isDatabaseHealthy) {
    return res.status(503).json(healthData);
  }

  res.status(200).json(healthData);
};

module.exports = { getHealth };

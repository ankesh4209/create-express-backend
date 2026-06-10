const mongoose = require("mongoose");

const getHealth = async (req, res) => {
  try {
    const mongoStatus = mongoose.connection.readyState;
    const isDatabaseHealthy = mongoStatus === 1;

    const data = {
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
      return res.status(503).json({
        success: false,
        message: "Database connection is unhealthy",
        data,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Health status retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getHealth };

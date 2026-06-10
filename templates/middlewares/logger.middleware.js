const logger = require("../config/logger");

/**
 * Middleware to log HTTP requests and responses.
 * Logs only non-sensitive metadata to prevent PII leaks and performance overhead.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log on response completion
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      JSON.stringify({
        method: req.method,
        route: req.originalUrl || req.url,
        statusCode: res.statusCode,
        responseTime: `${duration}ms`,
      }),
    );
  });

  next();
};

module.exports = requestLogger;

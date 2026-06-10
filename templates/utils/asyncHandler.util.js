/**
 * Wraps async Express handlers to forward errors to the global error handling middleware.
 * @param {Function} fn - Async express route handler
 * @returns {Function} Express middleware/handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

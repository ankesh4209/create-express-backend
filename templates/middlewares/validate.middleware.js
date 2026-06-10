const { BadRequestError } = require("../errors/BadRequestError");

/**
 * Reusable validation middleware using Zod.
 * Validates request body, params, and query against a Zod schema.
 *
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against
 * @returns {Function} Express middleware handler
 */
const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Replace original request inputs with parsed & cast outputs (preserves default values)
    req.body = parsed.body;
    req.query = parsed.query;
    req.params = parsed.params;

    next();
  } catch (error) {
    if (error.name === "ZodError") {
      const message = error.errors
        .map((err) => {
          // Remove the top level ('body', 'query', or 'params') from path for cleaner output
          const fieldPath = err.path.slice(1).join(".");
          const location = err.path[0];
          return `[${location}] ${fieldPath || "Field"}: ${err.message}`;
        })
        .join("; ");

      return next(new BadRequestError(message));
    }

    next(error);
  }
};

module.exports = validate;

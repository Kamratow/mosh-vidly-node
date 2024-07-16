const logger = require("../logger");

module.exports = function (err, req, res, next) {
  logger.error({
    level: "error",
    message: err.message,
    stack: err.stack,
    metadata: err, // Put what you like as meta
  });

  // Log the exception
  res.status(500).send("Something failed.");
};

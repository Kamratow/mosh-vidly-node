require("express-async-errors");
const logger = require("../logger");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    console.log("We got uncaught exception!");

    logger.log({
      level: "error",
      message: ex.message,
      metadata: ex,
    });
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    console.log("We got unhandled rejection!");

    logger.error(ex.stack, ex);
    process.exit(1);
  });
};

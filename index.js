require("express-async-errors");
const config = require("config");
const express = require("express");
const logger = require("./logger");
const error = require("./middleware/error");

const app = express();
require("./startup/routes")(app);
require("./startup/db")();

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

// const p = Promise.reject(new Error("Something failed asynchronously!"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exitCode = 1;
}

const port = process.env.PORT || 3000;

// Custom error middleware
app.use(error);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

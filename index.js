require("express-async-errors");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");

const app = express();
require("./startup/routes")(app);

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

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

// Custom error middleware
app.use(error);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

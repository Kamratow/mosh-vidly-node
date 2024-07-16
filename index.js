const config = require("config");
const express = require("express");
const error = require("./middleware/error");

const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

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

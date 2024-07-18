const express = require("express");
const error = require("./middleware/error");

const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

// const p = Promise.reject(new Error("Something failed asynchronously!"));

const port = process.env.PORT || 3000;

// Custom error middleware
app.use(error);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;

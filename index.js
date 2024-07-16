require("express-async-errors");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("./logger");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

const app = express();

process.on("uncaughtException", (ex) => {
  console.log("We got uncaught exception!");
  console.log(ex);

  logger.log({
    level: "error",
    message: ex.message,
    metadata: ex,
  });
});

throw new Error("Error when starting application!");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Custom error middleware
app.use(error);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const mongoose = require("mongoose");
const express = require("express");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const app = express();

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

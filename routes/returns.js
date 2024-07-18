const auth = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("CustomerId not provided");

  if (!req.body.movieId) return res.status(400).send("MovieId not provided");

  res.status(200).send("return success");
});

module.exports = router;

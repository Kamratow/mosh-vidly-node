const auth = require("../middleware/auth");
const express = require("express");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("CustomerId not provided");

  if (!req.body.movieId) return res.status(400).send("MovieId not provided");

  // Alternative approach for sturcturing the find conditions
  //   const rental = await Rental.findOne({
  //     customer: { _id: req.body.customerId },
  //     movie: { _id: req.body.movieId },
  //   });

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already returned.");

  rental.dateReturned = new Date();
  rental.rentalFee =
    Math.round(
      Math.abs(rental.dateReturned - rental.dateOut) / (1000 * 60 * 60 * 24)
    ) * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );

  res.status(200).send();
});

module.exports = router;

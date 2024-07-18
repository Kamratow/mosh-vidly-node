const Joi = require("joi");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const express = require("express");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  // Alternative approach for sturcturing the find conditions
  //   const rental = await Rental.findOne({
  //     customer: { _id: req.body.customerId },
  //     movie: { _id: req.body.movieId },
  //   });

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already returned.");

  rental.return();

  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );

  res.send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "object Id"),
    movieId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "object Id"),
  });

  return schema.validate(req);
}

module.exports = router;

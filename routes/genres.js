const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const { Genre, validate } = require("../models/genre");

const router = express.Router();

router.get("/", async (_req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = new Genre({
    name: req.body.name,
  });
  await newGenre.save();

  res.send(newGenre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  res.send(genre);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  res.send(genre);
});

module.exports = router;

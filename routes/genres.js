const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

router.get("/", async (_req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(
    (singleGenre) => singleGenre.id === parseInt(req.params.id)
  );

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(
    (singleGenre) => singleGenre.id === parseInt(req.params.id)
  );

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  const genreToDeleteIndex = genres.indexOf(genre);
  genres.splice(genreToDeleteIndex, 1);

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(newGenre);

  res.send(newGenre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(
    (singleGenre) => singleGenre.id === parseInt(req.params.id)
  );

  if (!genre) return res.status(404).send("Genre with given ID was not found");

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

module.exports = router;

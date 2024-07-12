const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 1024,
      required: true,
      unique: true,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

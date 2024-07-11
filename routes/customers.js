const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String,
  })
);

const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  pricePerMinute: { type: Number, required: true },
});

module.exports = mongoose.model("Show", showSchema);

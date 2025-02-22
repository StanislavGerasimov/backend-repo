const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  commissionRate: { type: Number, required: true },
});

module.exports = mongoose.model("Agent", agentSchema);

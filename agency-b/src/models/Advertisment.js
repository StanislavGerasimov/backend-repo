const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  totalCost: { type: Number },
});

advertisementSchema.pre("save", async function (next) {
  const show = await mongoose.model("Show").findById(this.show);
  if (show) {
    this.totalCost = this.duration * show.pricePerMinute;
  }
  next();
});

module.exports = mongoose.model("Advertisement", advertisementSchema);

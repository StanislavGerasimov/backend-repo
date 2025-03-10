const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Advertisement = require("../models/Advertisment");

router.get("/", async (req, res) => {
  try {
    const ads = await Advertisement.find()
      .populate("show")
      .populate("customer")
      .populate("agent");
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const ad = new Advertisement(req.body);
//     ad.totalCost = ad.duration * ad.show.pricePerMinute;
//     await ad.save();
//     res.status(201).json(ad);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
router.post("/", async (req, res) => {
  try {
    const { show, duration } = req.body;

    const showData = await mongoose.model("Show").findById(show);
    if (!showData) {
      return res.status(400).json({ message: "Show not found" });
    }

    const ad = new Advertisement(req.body);
    ad.totalCost = duration * showData.pricePerMinute;

    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id)
      .populate("show")
      .populate("customer")
      .populate("agent");
    if (!ad) return res.status(404).json({ message: "Реклама не знайдена" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: "Реклама видалена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

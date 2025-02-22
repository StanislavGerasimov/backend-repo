const express = require("express");
const router = express.Router();
const Show = require("../models/Show");

// show ads
router.get("/", async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// show ads
router.post("/", async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get show using id
router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: "Передача не знайдена" });
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update show
router.put("/:id", async (req, res) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedShow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete show
router.delete("/:id", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    res.json({ message: "Передача видалена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const GeneralTreasury = require("../Models/general_treasury");

// Route to create a new general treasury record
router.post("/", async (req, res) => {
  try {
    const { groupcoinPool, exchangeRate } = req.body;
    const newRecord = await GeneralTreasury.create(groupcoinPool, exchangeRate);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getTotalPool", async (req, res) => {
  try {
    const lastGroupCoinTotal = await GeneralTreasury.getLastGroupCoinPool();
    res.json(lastGroupCoinTotal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/last-exchange-rate", async (req, res) => {
  try {
    const lastExchangeRate = await GeneralTreasury.getLastExchangeRate();
    res.json(lastExchangeRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to retrieve the general treasury record by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await GeneralTreasury.findById(id);
    if (!record) {
      return res
        .status(404)
        .json({ error: "General treasury record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update the general treasury record
router.put("/", async (req, res) => {
  try {
    const { exchangeRate } = req.body;
    const updatedRecord = await GeneralTreasury.update(exchangeRate);
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete the general treasury record by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await GeneralTreasury.delete(id);
    if (deleted) {
      res.json({ message: "General treasury record deleted successfully" });
    } else {
      res.status(404).json({ error: "General treasury record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

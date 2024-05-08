const express = require("express");
const router = express.Router();
const Subsidiary = require("../Models/subsidiaries");

// Route to delete a subsidiary by its ID
router.delete("/:subsidiaryId", async (req, res) => {
  try {
    const subsidiaryId = req.params.subsidiaryId;
    const deletedSubsidiary = await Subsidiary.softDelete(subsidiaryId);
    if (!deletedSubsidiary) {
      return res.status(404).json({ error: "Subsidiary not found" });
    }
    res.json({ message: "Subsidiary deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new subsidiary
router.post("/", async (req, res) => {
  try {
    const { name, budget } = req.body;
    const newSubsidiary = await Subsidiary.create(name, budget);
    res.status(201).json(newSubsidiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Route to get all subsidiaries
router.get("/", async (req, res) => {
  try {
    const subsidiaries = await Subsidiary.getAll();
    res.json(subsidiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a subsidiary by its ID
router.get("/:subsidiaryId", async (req, res) => {
  try {
    const subsidiaryId = req.params.subsidiaryId;
    const subsidiary = await Subsidiary.getById(subsidiaryId);
    if (!subsidiary) {
      return res.status(404).json({ error: "Subsidiary not found" });
    }
    res.json(subsidiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a subsidiary by its ID
router.put("/", async (req, res) => {
  try {
    const { subsidiaryId, name, budget } = req.body;
    const updatedSubsidiary = await Subsidiary.update(
      subsidiaryId,
      name,
      budget
    );
    if (!updatedSubsidiary) {
      return res.status(404).json({ error: "Subsidiary not found" });
    }
    res.json(updatedSubsidiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

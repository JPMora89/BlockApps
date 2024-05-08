const express = require('express');
const router = express.Router();
const Balance = require('../Models/balances');

// Route to create a new balance
router.post('/', async (req, res) => {
  try {
    const { userId, balance } = req.body;
    const newBalance = await Balance.create(userId, balance);
    res.status(201).json(newBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all balances
router.get('/', async (req, res) => {
  try {
    const balances = await Balance.getAll();
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a balance by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const balance = await Balance.getByUserId(userId);
    if (!balance) {
      return res.status(404).json({ error: 'Balance not found' });
    }
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a balance by user ID
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newBalance = req.body.balance;
    const updatedBalance = await Balance.update(userId, newBalance);
    res.json(updatedBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a balance by user ID
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedBalance = await Balance.delete(userId);
    if (!deletedBalance) {
      return res.status(404).json({ error: 'Balance not found' });
    }
    res.json({ message: 'Balance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Transaction = require('../Models/transactions');

// Route to create a new transaction
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;
    const newTransaction = await Transaction.create(senderId, receiverId, amount);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.getAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a transaction by its ID
router.get('/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.getById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a transaction by its ID
router.put('/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const { senderId, receiverId, amount } = req.body;
    const updatedTransaction = await Transaction.update(transactionId, senderId, receiverId, amount);
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a transaction by its ID
router.delete('/:transactionId', async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const deletedTransaction = await Transaction.delete(transactionId);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

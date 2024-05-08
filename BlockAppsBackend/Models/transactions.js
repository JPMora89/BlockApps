const db = require('../db');

class Transaction {
  // Method to create a new transaction
  static async create(senderId, receiverId, amount) {
    const queryString = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES ($1, $2, $3) RETURNING *';
    const values = [senderId, receiverId, amount];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to get all transactions
  static async getAll() {
    const queryString = 'SELECT * FROM transactions';
    try {
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method to get a transaction by its ID
  static async getById(transactionId) {
    const queryString = 'SELECT * FROM transactions WHERE transaction_id = $1';
    const values = [transactionId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to update a transaction's information
  static async update(transactionId, senderId, receiverId, amount) {
    const queryString = 'UPDATE transactions SET sender_id = $1, receiver_id = $2, amount = $3 WHERE transaction_id = $4 RETURNING *';
    const values = [senderId, receiverId, amount, transactionId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to delete a transaction by its ID
  static async delete(transactionId) {
    const queryString = 'DELETE FROM transactions WHERE transaction_id = $1 RETURNING *';
    const values = [transactionId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Transaction;

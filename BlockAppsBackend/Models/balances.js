const db = require('../db');

class Balance {
  // Method to create a new balance
  static async create(userId, balance) {
    const queryString = 'INSERT INTO balances (user_id, balance) VALUES ($1, $2) RETURNING *';
    const values = [userId, balance];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to get all balances
  static async getAll() {
    const queryString = 'SELECT * FROM balances';
    try {
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method to get a balance by user ID
  static async getByUserId(userId) {
    const queryString = 'SELECT * FROM balances WHERE user_id = $1';
    const values = [userId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to update a balance
  static async update(userId, newBalance) {
    const queryString = 'UPDATE balances SET balance = $1 WHERE user_id = $2 RETURNING *';
    const values = [newBalance, userId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to delete a balance by user ID
  static async delete(userId) {
    const queryString = 'DELETE FROM balances WHERE user_id = $1 RETURNING *';
    const values = [userId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Balance;

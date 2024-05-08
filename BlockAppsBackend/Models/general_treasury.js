const db = require("../db");

class GeneralTreasury {
  // Method to create a new general treasury record
  static async create(groupcoinPool, exchangeRate) {
    const queryString =
      "INSERT INTO general_treasury (groupcoin_pool, exchange_rate) VALUES ($1, $2) RETURNING *";
    const values = [groupcoinPool, exchangeRate];

    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to retrieve a general treasury record by ID
  static async findById(id) {
    const queryString = "SELECT * FROM general_treasury WHERE treasury_id = $1";
    const values = [id];

    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getLastExchangeRate() {
    const queryString =
      "SELECT exchange_rate FROM general_treasury ORDER BY treasury_id DESC LIMIT 1";

    try {
      const { rows } = await db.query(queryString);
      if (rows.length > 0) {
        return rows[0].exchange_rate;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  static async getLastGroupCoinPool() {
    const queryString =
      "SELECT groupcoin_pool FROM general_treasury ORDER BY treasury_id DESC LIMIT 1";

    try {
      const { rows } = await db.query(queryString);
      if (rows.length > 0) {
        return rows[0].groupcoin_pool;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Method to update a general treasury record
  static async update(exchangeRate) {
    try {
      const query = `
        UPDATE general_treasury
        SET exchange_rate = $1
        RETURNING *;
      `;
      const values = [exchangeRate];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating general treasury: ${error.message}`);
    }
  }

  // Method to delete a general treasury record by ID
  static async delete(id) {
    const queryString = "DELETE FROM general_treasury WHERE treasury_id = $1";
    const values = [id];

    try {
      await db.query(queryString, values);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GeneralTreasury;

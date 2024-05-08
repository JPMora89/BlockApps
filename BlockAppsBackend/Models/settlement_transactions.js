const db = require("../db");

class SettlementTransaction {
  // Method to create a new settlement transaction
  static async create(subsidiaryId, amount) {
    const queryString =
      "INSERT INTO settlement_transactions (subsidiary_id, amount) VALUES ($1, $2) RETURNING *";
    const values = [subsidiaryId, amount];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to get all settlement transactions
  static async getAll() {
    const queryString = "SELECT * FROM settlement_transactions";
    try {
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method to get settlement transactions by subsidiary ID
  static async getBySubsidiaryId(subsidiaryId) {
    const queryString =
      "SELECT * FROM settlement_transactions WHERE subsidiary_id = $1";
    const values = [subsidiaryId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method to update a settlement transaction
  static async update(id, amount) {
    const queryString =
      "UPDATE settlement_transactions SET amount = $1 WHERE id = $2 RETURNING *";
    const values = [amount, id];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to delete a settlement transaction by ID
  static async delete(id) {
    const queryString =
      "DELETE FROM settlement_transactions WHERE id = $1 RETURNING *";
    const values = [id];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SettlementTransaction;

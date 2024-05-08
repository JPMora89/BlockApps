const db = require('../db');

class Subsidiary {
  // Method to create a new subsidiary
  static async create(name, budget) {
    const queryString = 'INSERT INTO subsidiaries (name, budget) VALUES ($1, $2) RETURNING *';
    const values = [name, budget];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to get all subsidiaries
  static async getAll() {
    const queryString = 'SELECT * FROM subsidiaries';
    try {
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method to get a subsidiary by its ID
  static async getById(subsidiaryId) {
    const queryString = 'SELECT * FROM subsidiaries WHERE subsidiary_id = $1';
    const values = [subsidiaryId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to update a subsidiary's information
  static async update(subsidiaryId, name, budget) {
    const queryString = 'UPDATE subsidiaries SET name = $1, budget = $2 WHERE subsidiary_id = $3 RETURNING *';
    const values = [name, budget, subsidiaryId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method to soft delete a subsidiary by its ID
static async softDelete(subsidiaryId) {
  const queryString = 'UPDATE subsidiaries SET deleted = TRUE WHERE subsidiary_id = $1 RETURNING *';
  const values = [subsidiaryId];
  try {
    const { rows } = await db.query(queryString, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

// static async getAllActive() {
//   const queryString = 'SELECT * FROM subsidiaries WHERE deleted = FALSE'; // Adjust this query
//   try {
//     const { rows } = await db.query(queryString);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }



  // Method to delete a subsidiary by its ID
  static async delete(subsidiaryId) {
    const queryString = 'DELETE FROM subsidiaries WHERE subsidiary_id = $1 RETURNING *';
    const values = [subsidiaryId];
    try {
      const { rows } = await db.query(queryString, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Subsidiary;

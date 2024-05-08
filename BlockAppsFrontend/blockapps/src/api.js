import axios from "axios";

const REACT_APP_BASE_URL = "";
const BASE_URL = REACT_APP_BASE_URL || "http://localhost:3001";

class BlockAppsAPI {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async createGroupcoinPool(groupcoinPoolData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/generaltreasury`,
        groupcoinPoolData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async updateExchangeRate(exchangeRateData) {
    try {
      const response = await axios.put(
        `${BASE_URL}/generaltreasury`,
        exchangeRateData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async distributeGroupcoins(distributionData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/generaltreasury/distribute`,
        distributionData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async getAllSubsidiaries() {
    try {
      const response = await axios.get(`${BASE_URL}/subsidiaries`);
      const filteredSubsidiaries = response.data.filter(
        (subsidiary) => !subsidiary.deleted
      );
      return filteredSubsidiaries;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async createSubsidiary(subsidiaryData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/subsidiaries`,
        subsidiaryData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }
  static async deleteSubsidiary(subsidiaryId) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/subsidiaries/${subsidiaryId}`
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async updateSubsidiary(updatedData) {
    try {
      const response = await axios.put(
        `${BASE_URL}/subsidiaries/`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async requestGroupcoins(subsidiaryId, requestAmount) {
    try {
      const response = await axios.post(
        `${BASE_URL}/subsidiaries/api/subsidiaries/${subsidiaryId}/request-groupcoins`,
        { amount: requestAmount }
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async createTransaction(senderId, receiverId, amount) {
    try {
      const response = await axios.post(`${BASE_URL}/transactions`, {
        senderId,
        receiverId,
        amount,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async getAllTransactions() {
    try {
      const response = await axios.get(`${BASE_URL}/transactions`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async getLastExchangeRate() {
    try {
      const response = await axios.get(
        `${BASE_URL}/generaltreasury/last-exchange-rate`
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }
  static async getTotalGroupCoin() {
    try {
      const response = await axios.get(
        `${BASE_URL}/generaltreasury/getTotalPool`
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }

  static async performSettlement() {
    try {
      const response = await axios.post(`${BASE_URL}/api/settlement`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw error.response.data.error.message;
    }
  }
}

export default BlockAppsAPI;

import React, { useState, useEffect } from "react";
import BlockAppsAPI from "../api";

const Dashboard = () => {
  const [groupcoinPool, setGroupcoinPool] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [updatedExchangeRate, setUpdatedExchangeRate] = useState();
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newSubsidiaryName, setNewSubsidiaryName] = useState("");
  const [newSubsidiaryBudget, setNewSubsidiaryBudget] = useState("");
  const [updatedGroupcoinPool, setUpdatedGroupcoinPool] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [endOfYearBudgets, setEndOfYearBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastExchangeRate = await BlockAppsAPI.getLastExchangeRate();
        setExchangeRate(lastExchangeRate || 1);

        const totalGroupcoinPool = await BlockAppsAPI.getTotalGroupCoin();
        setGroupcoinPool(totalGroupcoinPool);

        const subsidiariesResponse = await BlockAppsAPI.getAllSubsidiaries();
        setSubsidiaries(subsidiariesResponse);

        const transactionsResponse = await BlockAppsAPI.getAllTransactions();
        setTransactions(transactionsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTransaction = async () => {
    try {
      await BlockAppsAPI.createTransaction(
        senderId,
        receiverId,
        transactionAmount
      );

      // Update subsidiary budgets after successful transaction
      const updatedSubsidiaries = subsidiaries.map((subsidiary) => {
        if (subsidiary.subsidiary_id === parseInt(senderId)) {
          return {
            ...subsidiary,
            budget: parseInt(subsidiary.budget) - parseInt(transactionAmount),
          };
        }
        if (subsidiary.subsidiary_id === parseInt(receiverId)) {
          return {
            ...subsidiary,
            budget: parseInt(subsidiary.budget) + parseInt(transactionAmount),
          };
        }
        return subsidiary;
      });
      setSubsidiaries(updatedSubsidiaries);
      alert("Transaction went through!");

      for (const subsidiary of updatedSubsidiaries) {
        await BlockAppsAPI.updateSubsidiary({
          subsidiaryId: subsidiary.subsidiary_id,
          name: subsidiary.name,
          budget: subsidiary.budget,
        });
      }

      const updatedTransactions = await BlockAppsAPI.getAllTransactions();
      setTransactions(updatedTransactions);
      console.log("these are the transactions:", updatedTransactions);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const handleUpdateExchangeRate = async () => {
    try {
      const updatedExchangeRateResponse = await BlockAppsAPI.updateExchangeRate(
        { exchangeRate: updatedExchangeRate }
      );
      setExchangeRate(updatedExchangeRateResponse.exchange_rate || 1);
    } catch (error) {
      console.error("Error updating exchange rate:", error);
    }
  };

  const handleUpdateGroupcoinPool = async () => {
    try {
      const lastExchangeRate = await BlockAppsAPI.getLastExchangeRate();
      setExchangeRate(lastExchangeRate);
      const updatedGroupcoinPoolResponse =
        await BlockAppsAPI.createGroupcoinPool({
          groupcoinPool: updatedGroupcoinPool,
          exchangeRate: lastExchangeRate,
        });
      setGroupcoinPool(updatedGroupcoinPoolResponse.groupcoin_pool);
      alert("Groupcoin Pool was successfully updated!");
    } catch (error) {
      console.error("Error updating groupcoin pool:", error);
    }
  };

  const handleDistributeGroupcoinPool = async () => {
    try {
      const amountPerSubsidiary = groupcoinPool / subsidiaries.length;

      const updatedSubsidiaries = subsidiaries.map((subsidiary) => ({
        ...subsidiary,
        budget: parseInt(subsidiary.budget) + amountPerSubsidiary,
      }));

      setSubsidiaries(updatedSubsidiaries);

      // Update the groupcoin pool in the backend
      const updatedGroupcoinPoolResponse =
        await BlockAppsAPI.createGroupcoinPool({
          groupcoinPool: 0,
          exchangeRate,
        });
      setGroupcoinPool(updatedGroupcoinPoolResponse.groupcoin_pool);
      alert("Groupcoin Pool was successfully distributed to all subsidiaries!");
      for (const subsidiary of updatedSubsidiaries) {
        await BlockAppsAPI.updateSubsidiary({
          subsidiaryId: subsidiary.subsidiary_id,
          name: subsidiary.name,
          budget: subsidiary.budget,
        });
      }
    } catch (error) {
      console.error("Error distributing groupcoin pool:", error);
    }
  };

  const handleCreateSubsidiary = async () => {
    try {
      const newSubsidiaryData = {
        name: newSubsidiaryName,
        budget: newSubsidiaryBudget || 0,
      };
      const createdSubsidiary = await BlockAppsAPI.createSubsidiary(
        newSubsidiaryData
      );
      setSubsidiaries([...subsidiaries, createdSubsidiary]);
      alert("New Subsidiary successfully created!");
      console.log("Subsidiary created successfully.");
    } catch (error) {
      console.error("Error creating subsidiary:", error);
    }
  };

  const handleClearSubsidiaryBudgets = () => {
    const clearedSubsidiaries = subsidiaries.map((subsidiary) => ({
      ...subsidiary,
      budget: 0,
    }));
    setSubsidiaries(clearedSubsidiaries);
  };

  const handleYearEndSettlement = async () => {
    try {
      // Calculate new budgets based on exchange rate
      const updatedSubsidiaries = subsidiaries.map((subsidiary) => ({
        ...subsidiary,
        budget: parseInt(subsidiary.budget) * parseFloat(exchangeRate),
      }));
      setSubsidiaries(updatedSubsidiaries);
      console.log("Year-end settlement completed successfully.");
      // Calculate end-of-year budgets for display
      const endOfYearBudgetsData = subsidiaries.map((subsidiary) => ({
        name: subsidiary.name,
        budget: parseInt(subsidiary.budget) * parseFloat(exchangeRate),
      }));
      setEndOfYearBudgets(endOfYearBudgetsData);
      alert("The end of year budgets have been successfully created!");
    } catch (error) {
      console.error("Error during year-end settlement:", error);
    }
  };

  const handleDeleteSubsidiary = async (subsidiaryId) => {
    try {
      await BlockAppsAPI.deleteSubsidiary(subsidiaryId);
      setSubsidiaries(
        subsidiaries.filter(
          (subsidiary) => subsidiary.subsidiary_id !== subsidiaryId
        )
      );
      console.log("Subsidiary deleted successfully.");
    } catch (error) {
      console.error("Error deleting subsidiary:", error);
    }
  };

  return (
    <div>
      <h1>BlockApps Dashboard</h1>
      <div>
        <h2>Groupcoin Pool: {groupcoinPool}</h2>
        <button onClick={handleDistributeGroupcoinPool}>
          Distribute Groupcoin Pool
        </button>
        <input
          type="number"
          value={updatedGroupcoinPool}
          onChange={(e) => setUpdatedGroupcoinPool(e.target.value)}
        />
        <button onClick={handleUpdateGroupcoinPool}>
          Update Groupcoin Pool
        </button>
        <h2>Exchange Rate: {exchangeRate}</h2>
        <input
          type="number"
          value={updatedExchangeRate}
          onChange={(e) => setUpdatedExchangeRate(e.target.value)}
        />{" "}
        <button onClick={handleUpdateExchangeRate}>Update Exchange Rate</button>
      </div>
      <div>
        <h2>Subsidiaries:</h2>
        <ul>
          {subsidiaries
            .filter((subsidiary) => !subsidiary.deleted)
            .map((subsidiary) => (
              <li key={subsidiary.subsidiary_id}>
                Name: {subsidiary.name}, Budget: {subsidiary.budget}
                <button
                  onClick={() =>
                    handleDeleteSubsidiary(subsidiary.subsidiary_id)
                  }
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Subsidiary Name"
            value={newSubsidiaryName}
            onChange={(e) => setNewSubsidiaryName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Subsidiary Budget"
            value={newSubsidiaryBudget}
            onChange={(e) => setNewSubsidiaryBudget(e.target.value)}
          />
          <button onClick={handleCreateSubsidiary}>Create Subsidiary</button>
        </div>
      </div>
      <div>
        <h2>
          Start a Transaction, choose a sender & recipient along with the
          amount:
        </h2>
        <div>
          <select
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
          >
            <option value="">Select Sender</option>
            {subsidiaries.map((subsidiary) => (
              <option
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
              >
                {subsidiary.name}
              </option>
            ))}
          </select>
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          >
            <option value="">Select Receiver</option>
            {subsidiaries.map((subsidiary) => (
              <option
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
              >
                {subsidiary.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Transaction Amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <button onClick={handleCreateTransaction}>Create Transaction</button>
          <div>
            <h2>Transactions:</h2>
            <ul>
              {transactions &&
                transactions.map((transaction, index) => (
                  <li key={index}>
                    Sender: {transaction.sender_id}, Receiver:{" "}
                    {transaction.receiver_id}, Amount: {transaction.amount}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button onClick={handleClearSubsidiaryBudgets}>
          Clear Subsidiary Budgets
        </button>
      </div>
      <div>
        <h2>End of Year Budgets:</h2>{" "}
        <button onClick={handleYearEndSettlement}>Year-End Settlement</button>
        <ul>
          {endOfYearBudgets.map((item, index) => (
            <li key={index}>
              Name: {item.name}, Budget: {item.budget} USD
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import "./App.css";
import { viewAll } from "./services/services";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewAll();
        setTransactions(res);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.transId}>
            Transaction ID: {transaction.transId}, Type: {transaction.transType}, Amount: {transaction.transAmt}, Mode: {transaction.mode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

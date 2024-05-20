import "./expense.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAddtransaction } from "../../hooks/UseAddtransaction.js";
import { UseGetTransaction } from "../../hooks/UseGetTransaction.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config.js";

const Expense = () => {
  const { addTransaction } = UseAddtransaction();
  const { transactions, transactionsTotal } = UseGetTransaction();
  const {totalBalance, income, expense} = transactionsTotal;
  const {profilePhoto} = useGetUserInfo();
  const navitgate = useNavigate();

  const [description, setDiscription] = useState("");
  const [Amount, setAmout] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description: description,
      transactionAmount: Amount,
      transactionType: transactionType,
    });
  };

  const SignOut = async() =>{
    try {
      await signOut(auth)
      localStorage.clear() // since the user exit delete data
      navitgate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="expensetracker">
      <div className="container">
        <div className="form-section">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h2>Your Balance</h2>
            <h2>{totalBalance}:rs</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h3>Income</h3>
              <p>{income}:rs</p>
            </div>
            <div className="expense">
              <h3>Expense</h3>
              <p>{expense}rs</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              value={Amount}
              onChange={(e) => setAmout(e.target.value)}
            />
            <div>
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
            </div>
            <div>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
            <button type="submit">Add transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile"><img src={profilePhoto} /></div>
        )}
        <button onClick={SignOut}>Sign Out</button>
        <div className="transactions-section">
          <h3>Transactions</h3>
          <ul>
            {transactions.map((transaction) => {
              const { transactionAmount, transactionType, description } = transaction;
              return (
                <li key={transaction.id}>
                  <h4>{description}</h4>
                  <p>
                    Rs: {transactionAmount} : 
                    <label style={{ color: transactionType === "income" ? "green" : "red" }}>
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expense;

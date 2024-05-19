import "./expense.css";
import { useState } from "react"
import { UseAddtransaction } from "../../hooks/UseAddtransaction.js"
const Expense = () => {
  const { addTransaction } = UseAddtransaction();

  const [description, setDiscription] = useState("");
  const [Amount, setAmout] = useState(0);
  const [ transactionType , setTransactionType] = useState("expense")

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction(
      {description:description,
       transactionAmount:Amount,
        transactionType:transactionType});
  };

  return (
    <div className="expensetracker">
      <div className="container">
        <h1>Expense tracker</h1>
        <div className="balance">
          <h2>Your Balance</h2>
          <h2>120rs</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h3>Income</h3>
            <p>12rs</p>
          </div>
        </div>
        <div className="summary">
          <div className="expense">
            <h3>Expenses</h3>
            <p>12rs</p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={handleSubmit}>
          <input type="text" placeholder="Description" required name = {description} onChange={(e) =>setDiscription(e.target.value)}/>

          <input type="number" placeholder="Amount" required name={Amount} onChange ={(e) => setAmout(e.target.value)}/>
          <div>

            <input 
            type="radio" id="expense" 
            value="expense" 
            checked={transactionType ==="expense"}
            onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="expense">Expense</label>

          </div>
          <div>
            <input type="radio" 
            id="income"
             value="income" 
             checked={transactionType === "income"}
             onChange={(e) => setTransactionType(e.target.value)}/>

            <label htmlFor="income">Income</label>
          </div>
          <button type="submit">Add transaction</button>
        </form>
        <h3>Transactions</h3>
        {/* Render transactions list here */}
      </div>
    </div>
  );
};

export default Expense;

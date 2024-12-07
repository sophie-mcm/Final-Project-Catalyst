import React, { useState } from 'react';
import './styles.css';

function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "all", date: "" });

  const addTransaction = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const amount = parseFloat(form.amount.value);
    const type = form.type.value;
    const category = form.category.value;

    if (name && date && !isNaN(amount)) {
      setTransactions((prev) => [...prev, { name, date, amount, type, category }]);
      form.reset();
    }
  };

  const filterTransactions = (txns) => {
    return txns.filter((txn) => {
      const matchesType = filters.type === "all" || txn.type === filters.type;
      const matchesDate = !filters.date || txn.date === filters.date;
      return matchesType && matchesDate;
    });
  };

  const calculateTotals = (txns) => {
    const currentDate = new Date();
    const weekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    const totals = { weekly: { income: 0, expense: 0 }, monthly: { income: 0, expense: 0 } };

    txns.forEach(({ date, amount, type }) => {
      const txnDate = new Date(date);

      if (txnDate >= weekAgo) {
        totals.weekly[type] += amount;
      }
      if (txnDate >= monthAgo) {
        totals.monthly[type] += amount;
      }
    });

    return totals;
  };

  const calculateTotalsCat = (txns) => {
    const currentDate = new Date();
    const weekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    const totals = { weekly: {}, monthly: {} };

    txns.forEach(({ date, amount, type, category }) => {
      const txnDate = new Date(date);

      if (txnDate >= weekAgo) {
        if (!totals.weekly[category]) totals.weekly[category] = { income: 0, expense: 0 };
        totals.weekly[category][type] += amount;
      }
      
      if (txnDate >= monthAgo) {
        if (!totals.monthly[category]) totals.monthly[category] = { income: 0, expense: 0 };
        totals.monthly[category][type] += amount; }
    });

    return totals;
  };

  const filteredTransactions = filterTransactions(transactions);
  const totals = calculateTotals(transactions);
  const categoryTotals = calculateTotalsCat(transactions);

  return (
    <div className="budget-tracker">
      <h2>Transaction Tracker</h2>

      <form onSubmit={addTransaction}>
        <input type="text" name="name" placeholder="Transaction Name" required />
        <input type="date" name="date" required />
        <input type="number" name="amount" placeholder="Amount" required />
        <input type="text" name="category" placeholder="Category Name" required />
        <select name="type" required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit" className="centerButton">Add Transaction</button>
      </form>

      <div className="filter-container">
        <label>
          Filter by Type:
          <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Filter by Date:
          <input type="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
        </label>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.name}</td>
              <td>{txn.date}</td>
              <td>${txn.amount.toFixed(2)}</td>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals">
        <div>
          <h3>Weekly Totals</h3>
          <p>Income: ${totals.weekly.income.toFixed(2)}</p>
          <p>Expense: ${totals.weekly.expense.toFixed(2)}</p>
        </div>
        <div>
          <h3>Monthly Totals</h3>
          <p>Income: ${totals.monthly.income.toFixed(2)}</p>
          <p>Expense: ${totals.monthly.expense.toFixed(2)}</p>
        </div>
      </div>

      <div className="totals">
        <div>
          <h3>Weekly Totals per Category</h3>
            {Object.entries(categoryTotals.weekly).map(([category, totals]) => (
              <div key={category}>
                <p>{category}: ${(totals.income - totals.expense).toFixed(2)}</p>
              </div>
            ))}
          </div>
        <div>
          <h3>Monthly Totals per Category</h3>
            {Object.entries(categoryTotals.monthly).map(([category, totals]) => (
              <div key={category}>
                <p>{category}: ${(totals.income - totals.expense).toFixed(2)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;

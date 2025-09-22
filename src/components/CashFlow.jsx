import React, { useState, useEffect } from "react";
import styles from "./cashflow.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const STORAGE_KEY = "cashflow_transactions";

export default function CashFlow() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("Expense");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!price || !description) return;
    const newTx = {
      id: Date.now(),
      price: parseFloat(price),
      description,
      type,
      date: new Date(date).toLocaleDateString()
    };
    setTransactions(prev => [...prev, newTx]);
    setPrice("");
    setDescription("");
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const chartData = transactions.map(tx => ({
    ...tx,
    value: tx.type === "Income" ? tx.price : -tx.price
  }));

  const navigateToPage = (page) => {
    switch(page){
      case "home": window.location.href="/"; break;
      case "cash-flow": window.location.href="/cashflow"; break;
      default: break;
    }
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className={styles.pageCashFlow}>
      {/* HEADER */}
      <header className={styles.homeHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.homeLogo}>
            <img src="/src/assets/logo.png" alt="FinanceFlow" className="logo-image" />
            <span>FinanceFlow</span>
          </div>
        </div>

        <div className={styles.navButtons}>
          <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`} onClick={() => navigateToPage('home')}>Dashboard</button>
          <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`} onClick={() => navigateToPage('budgeting')}>Budgeting</button>
          <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`} onClick={() => navigateToPage('goals')}>Goals</button>
        </div>

        <div className={styles.userMenu}>
          <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className={styles.contentContainer}>
        <main className={styles.container}>
          <h1 className={styles.title}>Cash Flow</h1>

          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.inputGroup}>
            <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} className={styles.inputBox} />
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className={styles.inputBox} />
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className={styles.inputBox} />
            <select value={type} onChange={(e)=>setType(e.target.value)} className={styles.typeSelect}>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            <button onClick={addTransaction} className={styles.addButton}>Add</button>
          </div>

          <ul className={styles.transactionList}>
            {transactions.map(tx => (
              <li key={tx.id} className={styles.transactionItem}>
                <div className={styles.txInfo}>
                  <span className={styles.txDescription}>{tx.description}</span>
                  <span className={styles.txDate}>{tx.date}</span>
                </div>
                <div className={styles.txRight}>
                  <span className={tx.type==="Income"?styles.txIncome:styles.txExpense}>
                    {tx.type==="Income"?"+":"-"}${tx.price.toFixed(2)}
                  </span>
                  <button onClick={()=>deleteTransaction(tx.id)} className={styles.deleteButton} aria-label="Delete transaction">×</button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

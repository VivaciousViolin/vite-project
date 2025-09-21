import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; // Import zoom plugin

// Register necessary Chart.js components and zoom plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeSeriesScale);
ChartJS.register(zoomPlugin);

const Cashflow = () => {
  // Initialize state for transactions
  const [transactions, setTransactions] = useState([]);
  
  // Local state for input fields
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(getCurrentDate()); // Set the default date to today
  const [timeGranularity, setTimeGranularity] = useState('day'); // Default to "day"

  // Load transactions from localStorage when the component mounts
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleAddTransaction = () => {
    if (amount && description) {
      const newTransaction = {
        id: transactions.length + 1,
        amount: parseFloat(amount),
        description,
        date, // Use the input date here
      };

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

      // Clear input fields after adding transaction
      setAmount('');
      setDescription('');
      setDate(getCurrentDate()); // Reset the date to today
    }
  };

  const handleRemoveTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  // Helper function to get the labels (dates) based on granularity
  const getLabels = () => {
    const formattedDates = transactions.map((transaction) => new Date(transaction.date));
    let labels = [];

    if (timeGranularity === 'day') {
      labels = formattedDates.map((date) => date.toLocaleDateString()); // Labels are days
    } else if (timeGranularity === 'month') {
      labels = formattedDates.map((date) => `${date.getMonth() + 1}-${date.getFullYear()}`); // Month-Year
    } else if (timeGranularity === 'year') {
      labels = formattedDates.map((date) => date.getFullYear()); // Only Year
    } else if (timeGranularity === 'lifetime') {
      labels = Array.from(new Set(formattedDates.map((date) => date.toLocaleDateString()))); // Unique dates
    }

    return [...new Set(labels)]; // Remove duplicates
  };

  // Helper function to get the amounts for each label
  const getTransactionAmounts = (labels) => {
    return labels.map((label) => {
      return transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const labelDate = new Date(label);

          // Match by day
          if (timeGranularity === 'day') {
            return transactionDate.toLocaleDateString() === label;
          }
          // Match by month
          else if (timeGranularity === 'month') {
            return (
              transactionDate.getMonth() + 1 === label.split('-')[0] &&
              transactionDate.getFullYear() === parseInt(label.split('-')[1])
            );
          }
          // Match by year
          else if (timeGranularity === 'year') {
            return transactionDate.getFullYear() === parseInt(label);
          }
          return false;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0); // Sum of amounts for each label
    });
  };

  // Prepare chart data
  const getChartData = () => {
    const labels = getLabels();
    const data = getTransactionAmounts(labels);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Spending History',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Cashflow History</h1>

      {/* Chart.js Line Chart */}
      <div style={{ marginBottom: '30px' }}>
        <Line
          data={getChartData()}
          options={{
            responsive: true,
            scales: {
              x: {
                type: 'category', // Use 'category' for custom labels
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Spending History Over Time',
              },
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
                speed: 10,
              },
              zoom: {
                enabled: true,
                mode: 'xy',
                speed: 0.1,
                threshold: 10,
              },
            },
          }}
        />
      </div>

      {/* Granularity Buttons */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => setTimeGranularity('day')} style={{ margin: '0 10px' }}>
          Day
        </button>
        <button onClick={() => setTimeGranularity('month')} style={{ margin: '0 10px' }}>
          Month
        </button>
        <button onClick={() => setTimeGranularity('year')} style={{ margin: '0 10px' }}>
          Year
        </button>
        <button onClick={() => setTimeGranularity('lifetime')} style={{ margin: '0 10px' }}>
          Lifetime
        </button>
      </div>

      {/* Transaction Form */}
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      {/* Transaction List */}
      <div>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <span>{transaction.date} - {transaction.description}: ${transaction.amount}</span>
              <button
                onClick={() => handleRemoveTransaction(transaction.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Utility function to get the current date in the format required for <input type="date">
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default Cashflow;

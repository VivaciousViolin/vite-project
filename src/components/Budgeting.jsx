import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './Budgeting.module.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Main page component
function Budgeting({ currentUser, handleLogout, navigateToPage }) {
  const [activeFilter, setActiveFilter] = useState('1M');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  
  const [expenses, setExpenses] = useState([
    { category: 'Food', amount: 52 },
    { category: 'Clothing', amount: 22 },
    { category: 'Transportation', amount: 55 },
    { category: 'Entertainment', amount: 6 },
    { category: 'Renting', amount: 4 },
  ]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);
  
  const handleExpenseChange = (e, index) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = parseFloat(e.target.value) || 0;
    setExpenses(newExpenses);
  };

  const timeFilters = ['1D', '1W', '1M', '6M', '1Y', 'MAX'];
  
  // Data for the pie chart
  const chartData = {
    labels: expenses.map(item => item.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenses.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.pageBudgeting}>
      {/* HEADER INTEGRATED DIRECTLY */}
      <header className={styles.homeHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.homeLogo}>
            <img src="/src/assets/logo.png" alt="FinanceFlow" className={styles.logoImage} />
            <span>FinanceFlow</span>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
              onClick={() => navigateToPage('home')}
            >
              Dashboard
            </button>
            <button 
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
              onClick={() => navigateToPage('cash-flow')}
            >
              Cash Flow
            </button>
            <button 
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
              onClick={() => navigateToPage('goals')}
            >
              Goals
            </button>
          </div>
        </div>
        <div className={styles.userMenu}>
          <button 
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Budgeting Dashboard</h1>

          <div className={styles.budgetGrid}>
            {/* Left Card: Inputs */}
            <div className={styles.inputCard}>
              <div className={styles.monthlyBudgetSection}>
                <label className={styles.label}>My Monthly Budget is:</label>
                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  className={styles.inputBox}
                  placeholder="e.g., $2,500"
                />
              </div>

              <div className={styles.expenseInputsList}>
                <label className={styles.label}>Spending Per Category:</label>
                {expenses.map((item, index) => (
                  <div key={index} className={styles.expenseInputItem}>
                    <label htmlFor={item.category} className={styles.expenseLabel}>{item.category}</label>
                    <input
                      className={styles.expenseInput}
                      id={item.category}
                      type="number"
                      value={item.amount !== 0 ? item.amount : ''}
                      onChange={(e) => handleExpenseChange(e, index)}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Pie Chart */}
            <div className={styles.pieChartCard}>
              <div className={styles.chartWrapper}>
                <Pie 
                  data={chartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        enabled: true,
                      },
                      labels: {
                        render: 'label',
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
          
          <div className={styles.summarySection}>
            <p className={styles.summaryText}>
              Total Expenses: <span className={styles.highlight}>${totalExpenses}</span>
            </p>
            <p className={styles.summaryText}>
              Remaining Budget: <span className={styles.highlight}>${(monthlyBudget - totalExpenses).toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budgeting;
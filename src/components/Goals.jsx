import React, { useState, useMemo } from 'react';
import styles from './Goals.module.css';

const Goals = ({ handleLogout, navigateToPage }) => {
  const [goalAmount, setGoalAmount] = useState('');
  const [goalTime, setGoalTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [newMilestoneAmount, setNewMilestoneAmount] = useState('');
  const [newMilestoneMonths, setNewMilestoneMonths] = useState('');

  const monthlySavingsNeeded = useMemo(() => {
    let totalMonths = 0;
    if (timeUnit === 'years') {
      totalMonths = parseFloat(goalTime) * 12;
    } else if (timeUnit === 'months') {
      totalMonths = parseFloat(goalTime);
    } else if (timeUnit === 'weeks') {
      totalMonths = parseFloat(goalTime) / 4.345;
    }

    const baseSavings = (goalAmount / totalMonths) || 0;
    const milestoneSavings = milestones.reduce((sum, milestone) => {
      const savings = (milestone.amount / milestone.months) || 0;
      return sum + savings;
    }, 0);
    return (baseSavings + milestoneSavings).toFixed(2);
  }, [goalAmount, goalTime, timeUnit, milestones]);
  
  const savingsRatio = useMemo(() => {
    if (monthlyIncome > 0 && monthlySavingsNeeded > 0) {
      return (monthlySavingsNeeded / monthlyIncome) * 100;
    }
    return 0;
  }, [monthlyIncome, monthlySavingsNeeded]);

  let adviceText = '';
  let adviceClass = '';
  if (savingsRatio > 30) {
    adviceText = "This goal is highly ambitious and might be difficult.";
    adviceClass = styles.ambitious;
  } else if (savingsRatio > 10) {
    adviceText = "This goal requires careful planning.";
    adviceClass = styles.careful;
  } else if (savingsRatio > 0) {
    adviceText = "This goal is very achievable. Good job!";
    adviceClass = styles.achievable;
  }

  const progress = Math.min(Math.max(savingsRatio, 0), 100);

  const hasUserData = goalAmount > 0 || goalTime > 0 || monthlyIncome > 0;

  const handleAddMilestone = () => {
    if (newMilestoneText.trim() !== '' && newMilestoneAmount > 0 && newMilestoneMonths > 0) {
      setMilestones([
        ...milestones, 
        { 
          id: Date.now(), 
          text: newMilestoneText, 
          amount: parseFloat(newMilestoneAmount),
          months: parseFloat(newMilestoneMonths)
        }
      ]);
      setNewMilestoneText('');
      setNewMilestoneAmount('');
      setNewMilestoneMonths('');
    }
  };

  const handleDeleteMilestone = (id) => {
    setMilestones(milestones.filter(milestone => milestone.id !== id));
  };

  return (
    <div className={styles['page-goals']}> 
      <header className={styles['home-header']}>
        <div className={styles['header-left']}>
          <div className={styles['home-logo']}>
            <img src="/src/assets/logo.png" alt="FinanceFlow" className="logo-image" />
            <span>FinanceFlow</span>
          </div>
          <div className={styles['nav-buttons']}>
            <button 
              className={`${styles.btn} ${styles['btn-outline']} ${styles['btn-small']}`}
              onClick={() => navigateToPage('home')}
            >
              Dashboard
            </button>
            <button 
              className={`${styles.btn} ${styles['btn-outline']} ${styles['btn-small']}`}
              onClick={() => navigateToPage('cash-flow')}
            >
              Cash Flow
            </button>
            <button 
              className={`${styles.btn} ${styles['btn-outline']} ${styles['btn-small']}`}
              onClick={() => navigateToPage('budgeting')}
            >
              Budgeting
            </button>
          </div>
        </div>
        <div className={styles['user-menu']}>
          <button 
            className={`${styles.btn} ${styles['btn-outline']} ${styles['btn-small']}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>GOAL PAGE</h1>
          
          <div className={styles.goalForm}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>I want to save</label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className={styles.inputBox}
                placeholder="e.g., $10,000"
              />
              <label className={styles.label}>in</label>
              <input
                type="number"
                value={goalTime}
                onChange={(e) => setGoalTime(e.target.value)}
                className={styles.inputBox}
                placeholder="e.g., 5"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className={styles.timeUnitSelect}
              >
                <option value="years">years</option>
                <option value="months">months</option>
                <option value="weeks">weeks</option>
              </select>
            </div>
            
            <div className={styles.incomeSection}>
              <label className={styles.label}>My average monthly income is</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className={styles.inputBox}
                placeholder="e.g., $2,500"
              />
            </div>

            <div className={styles.resultBox}>
              {goalAmount > 0 && goalTime > 0 && (
                <p className={styles.monthlySavingsText}>
                  You need to save <span className={styles.highlight}>${monthlySavingsNeeded}</span> per month.
                </p>
              )}
            </div>
          </div>
          
          {hasUserData ? (
            <div className={styles.progressBarSection}>
              <p className={styles.progressLabel}>{progress.toFixed(0)}% of your monthly income</p>
              <div className={styles.progressBarContainer}>
                <div 
                  className={`${styles.progressBar} ${adviceClass}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={`${styles.advice} ${adviceClass}`}>{adviceText}</p>
            </div>
          ) : (
            <div className={styles.demoProgressSection}>
              <div className={styles.demoProgressBarContainer}>
                <div className={styles.demoProgressBar} style={{ width: '30%' }}></div>
              </div>
              <p className={styles.demoProgressLabel}>Example Progress: 30% of your income</p>
            </div>
          )}

          <div className={styles.milestonesSection}>
            <label className={styles.label}>My Milestones (e.g.)</label>
            <div className={styles.milestoneInputGroup}>
              <input
                type="text"
                value={newMilestoneText}
                onChange={(e) => setNewMilestoneText(e.target.value)}
                className={styles.milestoneInput}
                placeholder="Milestone description"
              />
              <input
                type="number"
                value={newMilestoneAmount}
                onChange={(e) => setNewMilestoneAmount(e.target.value)}
                className={styles.milestoneAmountInput}
                placeholder="Amount"
              />
              <input
                type="number"
                value={newMilestoneMonths}
                onChange={(e) => setNewMilestoneMonths(e.target.value)}
                className={styles.milestoneMonthsInput}
                placeholder="Months"
              />
              <button 
                onClick={handleAddMilestone} 
                className={styles.addMilestoneButton}
              >
                Add
              </button>
            </div>
            <ul className={styles.milestonesList}>
              {milestones.length === 0 ? (
                <li className={`${styles.milestoneItem} ${styles.exampleItem}`}>
                  <div className={styles.milestoneContent}>
                    <div className={styles.milestoneText}>Phone</div>
                    <div className={styles.milestoneSavingsInfo}>
                      Save $33.33/mo for 12 months (Total $400)
                    </div>
                  </div>
                  <div className={styles.exampleLabel}>Example</div>
                </li>
              ) : (
                milestones.map(milestone => (
                  <li key={milestone.id} className={styles.milestoneItem}>
                    <div className={styles.milestoneContent}>
                      <div className={styles.milestoneText}>{milestone.text}</div>
                      <div className={styles.milestoneSavingsInfo}>
                        Save ${((milestone.amount / milestone.months) || 0).toFixed(2)}/mo for {milestone.months} months
                      </div>
                    </div>
                    <div className={styles.deleteMilestoneButtonWrapper}>
                      <button 
                        onClick={() => handleDeleteMilestone(milestone.id)} 
                        className={styles.deleteMilestoneButton}
                      >
                        &times;
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
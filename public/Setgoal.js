import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Progress.css'; // Ensure this path is correct
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Setgoal.css';

const Setgoal = () => {
  const { currentUser } = useAuth();
  const [totalSaved, setTotalSaved] = useState(0);
  const [weeklySaving, setWeeklySaving] = useState('');
  const [goal, setGoal] = useState('');
  const [weeksNeeded, setWeeksNeeded] = useState(null);

  const calculateWeeksNeeded = async (e) => {
    e.preventDefault();
    if (goal && weeklySaving) {
      const weeks = Math.ceil((goal - totalSaved) / weeklySaving);
      setWeeksNeeded(weeks > 0 ? weeks : 'Goal already met');
      await submitWeeksNeeded();
    }
  };

  const submitWeeksNeeded = async () => {
    try {
      await axios.post(`http://localhost:5000/setGoal`, {
        username: currentUser,
        goal_value: goal,
        weekly_saving: weeklySaving,
        total_saved: totalSaved
      });
      // Success handling goes here
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="set-goal-container">
      <h1>Set Your Savings Goal</h1>
      <form onSubmit={calculateWeeksNeeded} className="set-goal-form">
        <div>
          <label htmlFor="goal">Goal Amount ($): </label>
          <input
            type="number"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="weeklySaving">Weekly Saving ($): </label>
          <input
            type="number"
            id="weeklySaving"
            value={weeklySaving}
            onChange={(e) => setWeeklySaving(e.target.value)}
            required
          />
        </div>
        <button type="submit">Go!</button>
      </form>
      {weeksNeeded !== null && (
        <div className="result-message">
          Weeks needed to reach goal: {weeksNeeded}
        </div>
      )}
    </div>
    </>
  );
};

export default Setgoal;

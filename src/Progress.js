import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import axios from 'axios';
import './Progress.css';

const Progress = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoal = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/Seegoal?username=${currentUser}`);
        if (response.data.goal !== undefined) { // Check if the goal key exists in the response
          setGoal({ progress: response.data.goal }); // Assuming 'goal' is the progress value
        } else {
          setGoal(null); // Explicitly setting goal to null for clarity
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
        setGoal(null); // Ensure goal is set to null on error to allow setting a new goal
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [currentUser, navigate]);

  const navigateToSetGoal = () => {
    navigate('/Setgoal');
  };

  // Render logic considering both loading and goal state
  return (
    <>
      <Navbar />
      <div className="progress-container">
        {loading ? (
          <p>Loading...</p>
        ) : goal ? (
          <>
            <h2>Goal Progress</h2>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${35}%` }}></div>
            </div>
            <p>35% towards your goal.</p>
            <button onClick={() => {/* handle upcoming payments */}}>View Upcoming Payments</button>
          </>
        ) : (
          <>
            <p>You have not set a goal yet.</p>
            <button onClick={navigateToSetGoal}>Set Goal</button>
          </>
        )}
      </div>
    </>
  );
};

export default Progress;
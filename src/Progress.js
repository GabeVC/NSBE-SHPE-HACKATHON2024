import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming this is correctly set up
import Navbar from './Navbar';
import axios from 'axios';
import './Progress.css';

const Progress = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Assuming currentUser provides the necessary identification
    const [goal, setGoal] = useState(null); // State to store the goal
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const fetchGoal = async () => {
            if (!currentUser) {
                navigate('/login'); // Redirect to login if no user is authenticated
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/Seegoal?username=${currentUser}`); // Adjust URL as needed
                setGoal(response.data.stats.goal); // Assuming the response contains goal data
                    
            } catch (error) {
                console.error('Error fetching goal:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false after fetch operation
            }
        };

        fetchGoal();
    }, [currentUser, navigate]);

    const navigateToSetGoal = () => {
        navigate('/Setgoal');
    };

    return (
        <>
            <Navbar />
            <div className="progress-container">
                {loading ? (
                    <p>Loading...</p> // Loading indicator while fetching goal data
                ) : goal ? (
                    <>
                        <h2>Goal Progress</h2>
                        {/* Display progress bar and goal information */}
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${goal.progress}%` }}
                            ></div>
                        </div>
                        <p>{goal.progress}% towards your goal of ${goal.target}.</p>
                        {/* Example of additional features */}
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
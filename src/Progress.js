import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Progress.css';
import Navbar from './Navbar';
import axios from 'axios';

const Progress = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const navigateToSetGoal = () => {
        navigate('/Setgoal'); // Use navigate to change the route
    };

    return (
        <>
            <Navbar/>
            <div className="progress-container">
                {/* Other content of your Progress component */}
                <button onClick={navigateToSetGoal}>Set Goal</button>
                {/* Button to navigate to SetGoal */}
            </div>
        </>
    );
};

export default Progress;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Progress.css';
import Navbar from './Navbar';
import axios from 'axios';

// const Setgoal = () => {
//   const [totalSaved, setTotalSaved] = useState('');
//   const [weeklySaving, setWeeklySaving] = useState('');
//   const [goal, setGoal] = useState('');
//   const [weeksNeeded, setWeeksNeeded] = useState(null);

//   const calculateWeeksNeeded = (e) => {
//     e.preventDefault(); // Prevent form submission from reloading the page
//     if (goal && totalSaved && weeklySaving) {
//       const weeks = Math.ceil((goal - totalSaved) / weeklySaving);
//       setWeeksNeeded(weeks > 0 ? weeks : 'Goal already met');
//     }
//   };

//   return (
//     <div>
//       <Navbar/>
//       <h1>Set Your Savings Goal</h1>
//       <form onSubmit={calculateWeeksNeeded}>
//         <div>
//           <label htmlFor="goal">Goal Amount ($): </label>
//           <input
//             type="number"
//             id="goal"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="totalSaved">Total Saved ($): </label>
//           <input
//             type="number"
//             id="totalSaved"
//             value={totalSaved}
//             onChange={(e) => setTotalSaved(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="weeklySaving">Weekly Saving ($): </label>
//           <input
//             type="number"
//             id="weeklySaving"
//             value={weeklySaving}
//             onChange={(e) => setWeeklySaving(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Calculate Weeks</button>
//       </form>
//       {weeksNeeded !== null && (
//         <h2>
//           Weeks needed to reach goal: {weeksNeeded}
//         </h2>
//       )}
//     </div>
//   );
// };

// export default Setgoal;

import { useAuth } from './AuthContext'; // Assuming you have access to useAuth

const Setgoal = () => {
  const { currentUser } = useAuth(); // Assuming you have access to currentUser from AuthContext
  const [totalSaved, setTotalSaved] = useState('');
  const [weeklySaving, setWeeklySaving] = useState('');
  const [goal, setGoal] = useState('');
  const [weeksNeeded, setWeeksNeeded] = useState(null);

  const calculateWeeksNeeded = async (e) => {
    e.preventDefault();
    if (goal && weeklySaving) {
      const weeks = Math.ceil((goal - totalSaved) / weeklySaving);
      setWeeksNeeded(weeks > 0 ? weeks : 'Goal already met');
    };
    
  const submitWeeksNeeded = async () => {
      try {
          const response = await axios.post(`http://localhost:5000/setGoal?username=${currentUser}`, {
          username: currentUser, // Send the current user's identifier
          goal_value: goal,
          weekly_saving: weeklySaving
        });
        
      } catch (error) {
        console.error('Error setting goal:', error);
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Set Your Savings Goal</h1>
      <form onSubmit={calculateWeeksNeeded}>
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
        <button type="submit">Calculate Weeks</button>
      </form>
      {weeksNeeded !== null && (
        <h2>
          Weeks needed to reach goal: {weeksNeeded}
        </h2>
      )}
    </div>
  );
};

export default Setgoal;
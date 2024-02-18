import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import './Friends.css'; // Import the CSS file

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/friends?username=${currentUser}`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

    return (
      <>
        <Navbar />
        <button onClick={fetchFriends} className="fetch-friends-btn">Fetch Friends</button>
        <div className="friends-container">
          {friends.length > 0 ? (
            <ul>
              {friends.map((friend, index) => (
                <li key={index} className="friend-item">
                  <span className="friend-name">{friend[0]}</span>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${friend[1]}%` }}></div>
                  </div>
                  <span className="friend-percentage">{friend[1]}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No friends to show.</p>
          )}
        </div>
      </>
    );
  };

  export default Friends;
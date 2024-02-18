import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import './Friends.css'; // Import the CSS file

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const runSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  const addFriend = async (friendUsername) => {
    try {
      const response = await axios.post('http://localhost:5000/add-friend', {
        username: currentUser,  // Assuming currentUser is the current user's username
        friend_username: friendUsername
      });
      
      if (response.data.success) {
        console.log('Friend added successfully:', friendUsername);
        // Optionally, you can update the UI to reflect the addition of the friend
      } else {
        console.error('Error adding friend:', response.data.message);
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      // Handle error scenario
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search friends"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={runSearch} className="search-btn">Run</button>
      </div>
      <div className="friends-container">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((friend, index) => (
              <li key={index} className="friend-item">
                <span className="friend-name">{friend}</span>
                <button onClick={() => addFriend(friend)} className="add-friend-btn">Add Friend</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No search results to show.</p>
        )}
      </div>
      <div className="button-container">
      <button onClick={fetchFriends} className="fetch-friends-btn">Refresh</button>
      </div>
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
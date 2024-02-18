import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';


const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useAuth(); // currentUser is now a string (username)

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  
  const fetchFriends = async () => {
    try {
      // Since currentUser is a username string, directly use it in the API call
      console.log(currentUser);
      const response = await axios.get(`http://localhost:5000/friends?username=${currentUser}`);
      setFriends(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <button onClick={fetchFriends}>Fetch Friends</button>
        {friends.length > 0 ? (
          <ul>
            {friends.map((friend, index) => (
              <li key={index}>{friend[0]+":"+friend[1]+"\%"}</li>
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
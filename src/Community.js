import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';


const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const { currentUser } = useAuth(); // currentUser is now a string (username)

  useEffect(() => {
    if (currentUser) {
      fetchCommunities();
    }
  }, [currentUser]);

  
  const fetchCommunities = async () => {
    try {
      // Since currentUser is a username string, directly use it in the API call
      console.log(currentUser);
      const response = await axios.get(`http://localhost:5000/community?username=${currentUser}`);
      setCommunities(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <button onClick={fetchCommunities}>Fetch Communities</button>
        {communities.length > 0 ? (
          <ul>
            {communities.map((community, index) => (
              <li key={index}>{community[0]+":"+community[1]+"\%"+community[2]}</li>
            ))}
          </ul>
        ) : (
          <p>No friends to show.</p>
        )}
      </div>
    </>
  );
};

export default Community;

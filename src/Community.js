import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const { currentUser } = useAuth(); // currentUser is now a string (username)

  useEffect(() => {
    if (currentUser) {
      fetchCommunities();
    }
  }, [currentUser]);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/community?username=${currentUser}`);
      setCommunities(response.data);
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
              // Assuming community is an object with name, community_goal_percent, and people properties
              <li key={index}>
                <strong>{community.name}</strong>: {community.community_goal_percent}%<br/>
                People: 
                <ul>
                  {/* Assuming people is a list of names */}
                  {community.people.map((person, personIndex) => (
                    <li key={personIndex}>{person}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No communities to show.</p>
        )}
      </div>
    </>
  );
};

export default Community;

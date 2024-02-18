import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Navbar = () => {
    const { currentUser, logout } = useAuth(); // Assuming your AuthContext provides these
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(); // Update your logout method accordingly
      navigate('/'); // Redirect to the homepage or login page after logout
    };
  
    return (
      <nav className="top-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Community">Community</Link></li>
          <li><Link to="/Progress">My Progress</Link></li>
          <li><Link to="/Friends">Friends</Link></li>
          <li><Link to="/News">News</Link></li>
          <li><Link to="/Help">Help</Link></li>
          {currentUser ? (
            <>
              <li className="right"><a href="/" onClick={handleLogout} role="button">Logout</a></li>
            </>
          ) : (
            <>
              <li className="right"><Link to="/Login" role="button">Login</Link></li>
              <li className="right"><Link to="/Signup" role="button">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
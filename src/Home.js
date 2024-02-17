import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'


const Home = () => {
    return (
      <>
        <nav className="top-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/my-progress">My Progress</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to="/News">News</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li className="right"><Link to="/login" role="button">Login</Link></li>
            <li className="right"><Link to="/signup" role="button">Signup</Link></li>
          </ul>
        </nav>
      </>
    );
  };
  
  export default Home;
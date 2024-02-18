import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'
import { useAuth } from './AuthContext';
import Navbar from './Navbar';


const Home = () => {
  return (
      <div>
          <Navbar />
          <div className="home-container">
              {/* Add your image here */}
              <img src="https://www.phila.gov/media/20200128000858/45346127991_f9e12b130e_k-700x400.jpg" alt="Philadelphia City" className="centered-image" />
              {/* Optionally, add additional content */}
          </div>
      </div>
  );
};
  
  export default Home;
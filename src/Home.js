import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'
import { useAuth } from './AuthContext';
import Navbar from './Navbar';


const Home = () => {
    return (
      <Navbar />
    );
  };
  
  export default Home;
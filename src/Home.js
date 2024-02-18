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
            <img src="https://www.phila.gov/media/20200128000858/45346127991_f9e12b130e_k-700x400.jpg" alt="Philadelphia City" className="centered-image" />
            <div className="text-box left-box">
                <h2>TruOP</h2>
            </div>
            <div className="text-box right-box">
                <h2>Budgeting at your speed</h2>
                <p>Our goal is to help and inspre you to be able to save and make goals for yourself</p>
            </div>
            <div className="text-box right-box">
                <h2>You're not alone</h2>
                <p>By grouping and seeing progress with others, goals seem more achieveable</p>
            </div>
            <img src="https://cbx-prod.b-cdn.net/COLOURBOX61595553.jpg?width=800&quality=90" alt="Philadelphia City2" className="bottom-image" />
        </div>
    </div>
);
};
  
  export default Home;
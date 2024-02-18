import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import Carousel from './Carousel'; // Adjust the import path according to your file structure




const Home = () => {
    const images = [
      '/image1.jpg',
      '/image2.jpg',
      '/image3.jpg',
  ]
  return (
    <>
    <Navbar />
    <div className="home-container">
      <Carousel images={images} />
      <div className="text-boxes-container">
        <div className="text-box">
          <h2>Budgeting at your speed</h2>
          <p>Our goal is to help and inspire you to be able to save and make goals for yourself.</p>
        </div>
        <div className="text-box">
          <h2>TruOP</h2>
        </div>
        <div className="text-box">
          <h2>You're not alone</h2>
          <p>By grouping and seeing progress with others, goals seem more achievable.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
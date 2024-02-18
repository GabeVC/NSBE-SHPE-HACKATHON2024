import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Help.css'
import Navbar from './Navbar';

const Help = () => {
    return (
      <>
        <Navbar />
        <div className="help-container">
          <h1>Financial Literacy 101</h1>
          <p>Welcome to the Financial Literacy Help Page. Here, you'll find basic advice and resources to get you started on the path to financial well-being.</p>
          <h2>Understanding Budgeting</h2>
          <p>Budgeting is the first step towards financial literacy. Knowing how much money you have, where it goes, and how to manage it effectively can help you save and plan for the future.</p>
          <h2>Saving and Investing</h2>
          <p>Saving is essential for unexpected expenses and long-term goals, while investing can help grow your wealth. Start small and learn about different investment options.</p>
          <h2>Credit and Debt Management</h2>
          <p>Understanding credit scores, how to build credit, and managing debt is crucial. Always aim to pay more than the minimum due on debts and keep your credit utilization low.</p>
          <h2>Seek Professional Advice</h2>
          <p>If you're unsure where to start, consider speaking with a financial advisor. They can help create a personalized plan that suits your needs and goals.</p>
          <Link to="/">Back to Home</Link>
        </div>
      </>
    );
  };
  
  export default Help;
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { useAuth } from './AuthContext';
import Navbar from './Navbar';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [failure, setFailure] = useState(true);
    
    const { login } = useAuth();

    const signIn = async (event) => {
      event.preventDefault(); 
      try {
        const response = await axios.post("http://localhost:5000/login", {
          username,
          password,
        });
        if (response.data.success) {
          console.log('Login successful');
          // Assuming 'login' now expects a user object, adjust accordingly
          login(response.data.user); // Update the login state with user info
          navigate('/Progress');
        } else {
          setFailure(true); // Show login failed message
          console.error('Login failed');
        }
      } catch (error) {
        setFailure(true); // Show login failed message on error
        console.error('Error:', error);
      }
    };
  
    return (
        <>
          <nav className="top-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/progress">My Progress</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/Help">Help</Link></li>
            <li className="right"><Link to="/Login" role="button">Login</Link></li>
            <li className="right"><Link to="/Signup" role="button">Signup</Link></li>
          </ul>
        </nav>

          <div className="main">
            <p className="sign">Login</p>
            <div className="login-div">
              <span className="noAccount"> Don't have an account? <Link to="/signup">Sign Up</Link> </span>
            </div>
            <form className="form1" onSubmit={signIn}>
              <input className="un" type="text" align="center" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="pass" type="password" align="center" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="submit" align="center">Sign in</button>
              {failure && (
              <p class="error">
              <div>Username or Password Incorrect</div>
              </p> )}
            </form>
          </div>

        </>
      );
    }
    
    export default Login;
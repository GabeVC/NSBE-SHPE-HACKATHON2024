import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
    const[user, setUserName] = useState('');
    const[pass, setPassWord] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const[samePass, setSamePass] = useState(false);
    const[created, setCreated] = useState(false);
    const handleUserChange = (event) => {
      setUserName(event.target.value);
    };
    const handlePassChange = (event) => {
      setPassWord(event.target.value);
      if (confirmPass === event.target.value)
      {
        setSamePass(true);
      }
      else{setSamePass(false);}
      
    };
    const handleConfirmPassChange = (event) => {
      setConfirmPass(event.target.value);
      if (pass === event.target.value)
      {
        setSamePass(true);
      }
      else{setSamePass(false);}
    };
  
    const submitClicked =  async () => {
      if (samePass === true){
      try {
        const response = await axios.post('http://localhost:5000/register', {
          user, 
          pass,
      });
      setCreated(true);
      console.log('Response from the server:', response.data);
     } catch (error) {
        console.error('Error:', error);
      }
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
            <li className="right"><Link to="/login" role="button">Login</Link></li>
            <li className="right"><Link to="/signup" role="button">Signup</Link></li>
          </ul>
        </nav>
        {!created && (
      <div class="main">
        <p class="sign">
          <div>Create a New Account</div> 
          <div class="login-div"><span class="AAccount"> Already have an account? <a href="./login">Login</a> </span> </div>
        </p>
          <form class="form1">
            <input class="un " type="text" align="center" placeholder="Username" value={user} onChange={handleUserChange}/>
            <input class="pass" type="password" align="center" placeholder="Password" value={pass} onChange={handlePassChange}/>
            <input class="pass2" type="password" align="center" placeholder="Confirm Password" value={confirmPass} onChange={handleConfirmPassChange}/>
            {!samePass && (<p class="pass_alert">*Passwords must be the same</p>)}
            <button onClick={submitClicked} class="submit" align="center">Sign in</button>  
          </form>
      </div>
      )}
      </>
    );
  };
  
  export default Signup;
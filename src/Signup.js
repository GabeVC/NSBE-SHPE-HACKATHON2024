import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import Navbar from './Navbar';

function Signup() {
    const[name, setName] = useState('');
    const[number, setNumber] = useState('');
    const[user, setUserName] = useState('');
    const[pass, setPassWord] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const[samePass, setSamePass] = useState(false);
    const[created, setCreated] = useState(false);
    const navigate = useNavigate();
    const handleUserChange = (event) => {
      setUserName(event.target.value);
    };
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
    const handleNumberChange = (event) => {
      setNumber(event.target.value)
    }
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
  
    const submitClicked =  async (event) => {
      event.preventDefault();
      if (samePass === true){
      try {
        const data = {
          user: user,
          pass: pass,
          number: number,
          name: name,
        };
        const response = await axios.post('http://localhost:5000/signup', data
      );
      navigate('/login');
      console.log('Response from the server:', response.data);
     } catch (error) {
        console.error('Error:', error);
      }
    }
    };
    
    return (
      <>
        <Navbar />
        {!created && (
      <div class="main">
        <p class="sign">
          <div>Create a New Account</div> 
          <div class="login-div"><span class="AAccount"> Already have an account? <a href="./login">Login</a> </span> </div>
        </p>
          <form class="form1">
            <input class="name"type="text" align="center" placeholder="Phone Number" value={number} onChange={handleNumberChange}/>
            <input class="number"type="text" align="center" placeholder="Name" value={name} onChange={handleNameChange}/>
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
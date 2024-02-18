import React from 'react';
import Home from './Home';
import News from './News';
import Help from './Help';
import Signup from './Signup';
import Login from './Login';
import Community from './Community';
import Friends from './Friends';
import Progress from './Progress';
import Setgoal from './Setgoal';
import { AuthProvider } from './AuthContext'; 
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/News" element={<News/>} />
      <Route path="/Help" element={<Help/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Community" element={<Community/>} />
      <Route path="/Friends" element={<Friends/>} />
      <Route path="/Progress" element={<Progress/>} />
      <Route path="/Setgoal" element={<Setgoal/>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

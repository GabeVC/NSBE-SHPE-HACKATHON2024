import React from 'react';
import Home from './Home';
import News from './News';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/News" element={<News/>} />
      </Routes>
    </Router>
  );
}

export default App;

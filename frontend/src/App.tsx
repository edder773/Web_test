import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 'Switch' 대신 'Routes'를 사용

import Login from './accounts/login';
import Signup from './accounts/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

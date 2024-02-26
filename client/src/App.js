// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Type from './components/Type';
import Userlogin from './components/Userlogin';
import AdminLogin from './components/AdminLogin';
import Usersign from './components/Usersign';
import Adminpg from './components/Adminpg';
import User from './components/User';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Type />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Usersign" element={<Usersign />} />
        <Route path="/Adminpg" element={<Adminpg />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;

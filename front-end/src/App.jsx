import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UpdateScore from './components/UpdateScore';
import Inicio from './components/Inicio'
import './styles/index.css'



const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/scores" element={<UpdateScore />} />
              <Route path="/inicio" element={<Inicio />} />
          </Routes>
      </Router>
  );
};

export default App;


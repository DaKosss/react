import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './modules/components/Header';
import Home from './modules/Home';
import Contacts from './modules/Contacts';
import About from './modules/About';
import Blog from './modules/Blog';
import RegisterForm from './modules/components/RegisterForm';
import LoginForm from './modules/components/LoginForm';
import ProfilePage from './modules/ProfilePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false); // Устанавливаем состояние isAuthenticated в false при выходе из системы
    window.location.reload();
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/register"
          element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginForm isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

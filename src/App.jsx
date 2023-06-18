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
import UserContext from './models/UserContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogin = (loggedInUserId) => {
    setUserId(loggedInUserId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Устанавливаем состояние isAuthenticated в false при выходе из системы
    setUserId(null);
    window.location.reload();
  };

  return (
    <Router>
       <UserContext.Provider value={{ userId, setUserId, username, setUsername }}>
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
            element={<LoginForm isAuthenticated={isAuthenticated} setUserId={setUserId} setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/profile"
            element={<ProfilePage onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
          />
          </Routes>
       </UserContext.Provider>
      
    </Router>
  );
};

export default App;

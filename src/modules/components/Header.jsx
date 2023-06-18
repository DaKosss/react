import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Header.css';
import logo from '../assets/logo192.png';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../../models/UserContext';

const Header = ({ isAuthenticated, onLogout }) => {
  const { role } = useContext(UserContext); // Получение роли пользователя из контекста

  const handleLogout = () => {
    onLogout();
  };

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      if (role === 'admin') { // Проверка роли пользователя
        return (
          <>
            <Nav.Link as={Link} to="/adminpanel">
              AdminPanel
            </Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>
        );
      } else {
        return (
          <>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>
        );
      }
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </>
      );
    }
  };


  return (
    <>
      <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} height="30" width="30" className="d-inline-block align-block" alt="Logo" /> React Site
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contacts">
                Contacts
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
            </Nav>
            <Nav>{renderAuthLinks()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

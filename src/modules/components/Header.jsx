import React, { Component } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Header.css';
import logo from '../assets/logo192.png';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import axios from 'axios';

import Home from '../Home';
import Contacts from "../Contacts";
import About from "../About";
import Blog from "../Blog";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegisterModal: false,
      showLoginModal: false
    };
  }

  render() {
    return (
      <>
        <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} height="30" width="30" className="d-inline-block align-block" alt="Logo" /> React Site
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" > Home </Nav.Link>
                <Nav.Link href="/about" > About Us </Nav.Link>
                <Nav.Link href="/contacts" > Contacts </Nav.Link>
                <Nav.Link href="/blog" > Blog </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/register" >Register</Nav.Link>
                <Nav.Link href="/login" >Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </Router>
      </>
    );
  }
}

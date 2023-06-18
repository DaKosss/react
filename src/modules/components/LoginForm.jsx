import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoginError('');

    axios
      .post('/api/login', {
        username: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        console.log(response.data);
        // Дополнительная логика после успешной авторизации
        setIsAuthenticated(true); // Установка состояния авторизации в true
        navigate('/'); // Перенаправление на основную страницу
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('Invalid email or password');
      });
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return null; // Возвращаем null, если пользователь авторизован
    }

    return (
      <>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="secondary" type="button">
          Register
        </Button>
      </>
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4">Login</h1>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              autoComplete="username"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </Form.Group>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          {renderAuthButtons()} {/* Условное отображение кнопок */}
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;

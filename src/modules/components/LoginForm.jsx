import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../models/UserContext';

const LoginForm = ({ isAuthenticated, setIsAuthenticated }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { setUserId, setUsername, setRole } = useContext(UserContext); // Получение функций из контекста

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

        // Выполнение GET-запроса для получения ID и имени пользователя
        axios
          .get(`/api/user/id?username=${loginEmail}`)
          .then((response) => {
            const { id, username, role } = response.data; // Получение ID, имени пользователя и роли из ответа
            setUserId(id); // Установка ID пользователя в состояние
            setUsername(username); // Установка имени пользователя в состояние
            setRole(role); // Установка роли пользователя в состояние
            navigate('/'); // Перенаправление на основную страницу
          })
          .catch((error) => {
            console.error('Error:', error);
            // Обработка ошибки получения ID, имени пользователя и роли
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('Invalid email or password');
      });
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
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;

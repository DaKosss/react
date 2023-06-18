import React, { useState } from 'react';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterForm = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    setRegisterError('');

    axios
      .post('/api/register', {
        username: registerEmail,
        password: registerPassword
      })
      .then((response) => {
        console.log(response.data);
        clearForm();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const clearForm = () => {
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterError('');
  };

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group className="mb-3" controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <FormControl
            type="string"
            placeholder="Enter email"
            autoComplete="username"
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRegisterConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={registerConfirmPassword}
            onChange={(event) => setRegisterConfirmPassword(event.target.value)}
          />
        </Form.Group>
        {registerError && <Alert variant="danger">{registerError}</Alert>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;

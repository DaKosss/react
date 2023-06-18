import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';


const RegisterPage = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!registerUsername || !registerPassword || !registerConfirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    setRegisterError('');

    try {
      const response = await axios.post('/api/register', {
        username: registerUsername,
        password: registerPassword,
      });
      console.log('Registration successful');
      setShowModal(true);
      // Дополнительная логика после успешной регистрации
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Username already exists'
      ) {
        setRegisterError('Username already exists');
      } else {
        console.error('Error:', error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4">Register</h1>
        <Form onSubmit={handleRegisterSubmit}>
          <Form.Group className="mb-3" controlId="formRegisterUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={registerUsername}
              onChange={(event) => setRegisterUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRegisterPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRegisterConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={registerConfirmPassword}
              onChange={(event) => setRegisterConfirmPassword(event.target.value)}
            />
          </Form.Group>
          {registerError && <Alert variant="danger">{registerError}</Alert>}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your registration was successful.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default RegisterPage;


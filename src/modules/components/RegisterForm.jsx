import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showModal, setShowModal] = useState(false); // Состояние модального окна

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
      setShowModal(true); // Открываем модальное окно после успешной регистрации
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
          {/* Форма регистрации */}
          {/* ... */}
          {/* Компонент модального окна */}
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
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;

import React from 'react';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';

const LoginForm = ({ handleClose }) => {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Отправка данных на сервер для авторизации
    // ...
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Loginsfsefe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>Email address</Form.Label>
            <FormControl type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <FormControl type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;

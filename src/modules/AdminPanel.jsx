import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../models/UserContext';

const AdminPanel = () => {
  const { userId, role } = useContext(UserContext); // Получение ID и роли пользователя из контекста
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      // Если пользователь не авторизован (userId равен null), перенаправляем его на главную страницу
      navigate('/');
    }
  }, [role, navigate]);

  return <div>AdminPanel</div>;
};

export default AdminPanel;

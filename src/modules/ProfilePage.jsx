import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../models/UserContext';

const ProfilePage = () => {
  const { userId, username } = useContext(UserContext); // Получение ID и имени пользователя из контекста
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      // Если пользователь не авторизован (userId равен null), перенаправляем его на главную страницу
      navigate('/');
    }
  }, [userId, navigate]);

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Username: {username}</p>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default ProfilePage;

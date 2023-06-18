import React, { useContext } from 'react';
import UserContext from '../models/UserContext';

const ProfilePage = () => {
  const { userId, username } = useContext(UserContext); // Получение ID и имени пользователя из контекста

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Username: {username}</p>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default ProfilePage;

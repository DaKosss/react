import React from 'react';

const UserContext = React.createContext({
  userId: '',
  setUserId: (userId) => {},
  username: '',
  setUsername: (username) => {},
  role: '',
  setRole: (role) => {},
});

export default UserContext;

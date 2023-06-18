import React from 'react';

const UserContext = React.createContext({
  userId: '',
  setUserId: (userId) => {},
  username: '',
  setUsername: (username) => {},
});

export default UserContext;

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // 🔄 Load user from localStorage on refresh
  useEffect(() => {   
    const savedUser = localStorage.getItem("user_data");
    if (savedUser) setUserData(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  );
};



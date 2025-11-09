// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0); // add this

  // 🔄 Load user from localStorage on refresh
  useEffect(() => {   
    const savedUser = localStorage.getItem("userData");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, totalEmployees, setTotalEmployees  }}>
      {children}
    </UserContext.Provider>
  );
};

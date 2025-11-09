import { useEffect, useState, useContext  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { user,totalEmployees } = useContext(UserContext);
  


  // 🔹 Load user info from localStorage (set after login)
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('userData');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
   // setUser(null);
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', background: '#f5f5f5' }}>      
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Home</NavLink>
        {/* 🔸 Nav Links */}
        {!user ? (
          <>
          <NavLink to="/login" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`} style={{ marginRight: '1rem' }}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Register</NavLink>
          </> ) : 
          (          
          <>
          <NavLink to="/properties" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Property List</NavLink>
          <NavLink to="/employees" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Employee List [{totalEmployees}]</NavLink>
        </>)}

        {/* 🔸 User Info */}
        <div>
          {user ? (
            <>
              <span>👋 Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <span>Guest</span>
          )}
        </div>
      </nav>
    </header>
  );
}

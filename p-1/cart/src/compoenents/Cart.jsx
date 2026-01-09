import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const WelcomePage = () => {
  const { user,setUser } = useContext(CartContext);

  return (
    <div>
      <h1>Welcome User:</h1>
      <p>Name: {user}<button onClick={()=>setUser((p)=>p+1)}>+</button></p>
    </div>
  );
};

export default WelcomePage;
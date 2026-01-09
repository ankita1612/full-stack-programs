import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartList from './CartList'

const products = [
  { id: "1", name: "Audi", price:10 },
  { id: "2", name: "BMW", price:20 },
  { id: "3", name: "Chevrolet", price:30 },
  { id: "4", name: "Citroen", price:40 },
  { id: "5", name: "Hyundai", price:50 },
];

const WelcomePage = () => {
  const { user,setUser } = useContext(CartContext);

  return (
    <div>
      <h1>Welcome User:</h1>
      <p>Name: {user}<button onClick={()=>setUser((p)=>p+1)}>+</button></p>
      {products.map((p) => (
       <CartList key={p.id} item={p} />

      ))}
    </div>
  );
};

export default WelcomePage;
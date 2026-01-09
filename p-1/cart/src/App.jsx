import { useState } from 'react'
import CartProvider from './context/CartContext';
import Cart from './compoenents/Cart'
import Cart1 from './compoenents/Cart1'
function App() {

  return (
    <>
       <CartProvider>
        <Cart1></Cart1>
        <Cart></Cart>        
       </CartProvider>
        
    </>
  )
}

export default App

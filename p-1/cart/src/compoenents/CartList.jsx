import React, { useState,useContext } from 'react'
import { CartContext } from '../context/CartContext';

function CartList(prop) {
  const [cntr, setCntr] =useState(0)
  const { cart, dispatch, mainItem } = useContext(CartContext);
    // console.log("Cart start")
    // console.log(cart)
    // console.log("Cart end")
    // console.log("mainItem start")
    // console.log(mainItem)
    // console.log("mainItem emd")
    const handleRemove = () =>{
      if(cntr>0){
        setCntr((prev) =>prev-1)
         dispatch({ type: "REMOVE_FROM_CART", payload: prop.item.id });
      }
    }
    const handleAdd = () =>{
       if(cntr<10){
         setCntr((prev) =>prev+1)
          dispatch({ type: "ADD_TO_CART", payload: prop.item });
       }
     
    }
  return (    
        <ul>
          <li >
            {prop.item.info} - ${prop.item.price}  {"    "}
            <button onClick={handleRemove}>-</button>{"    "}{cntr}{"    "}<button onClick={handleAdd}>+</button>
          </li>
        </ul>                          
  )
}

export default CartList
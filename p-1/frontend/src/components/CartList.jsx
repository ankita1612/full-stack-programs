import React, { useState,useContext } from 'react'
import { UserContext } from '../context/Context';

function CartList(prop) {
  const [cntr, setCntr] =useState(0)
      const { cart, dispatch } = useContext(UserContext);
   
    console.log(cart)
    const handleRemove = () =>{
      if(cntr>0){
        setCntr((prev) =>prev-1)
         dispatch({ type: "REMOVE_ITEM", payload: prop.item });
      }
    }
    const handleAdd = () =>{
      if(cntr<10){
        setCntr((prev) =>prev+1)
         dispatch({ type: "ADD_ITEM", payload: prop.item });
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
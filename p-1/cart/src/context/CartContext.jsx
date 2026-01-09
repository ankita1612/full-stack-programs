// Context.js
import React, { createContext, useState,useReducer } from 'react';
const initialState = {
  cart: [],
};
const cartReducer = (state, action) => {
  switch (action.type) {
    
    case "ADD_TO_CART":{
        const exists = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }
   case "REMOVE_FROM_CART": {
      const item = state.cart.find(
        (item) => item.id === action.payload
      );

      if (item.qty === 1) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) => item.id !== action.payload
          ),
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    }
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        )
      };
    default:
      break;
  }
};

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [user,setUser] = useState(0);
   const [cartItem, dispatch] = useReducer(cartReducer,initialState );
  return (
    <CartContext.Provider value={{user,setUser,cart: cartItem.cart, dispatch, mainItem:cartItem}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
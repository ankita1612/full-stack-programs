import { createContext, useReducer, useCallback } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const id = action.product.id;
      return {
        ...state,
        [id]: (state[id] || 0) + 1,
      };
    }
    case "REMOVE": {
      const id = action.product.id;
      if (!state[id]) return state;
      const newState = { ...state };
      newState[id]--;
      if (newState[id] === 0) delete newState[id];
      return newState;
    }
    case "REMOVE-1": {
       const id = action.product.id;
      if (!state[id]) return state;
      const newState ={
        ...state,
        [id]: state[id] - 1,
      };
    
      if (newState[id] === 0) delete newState[id];
      return newState;    
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {});

  const addToCart = useCallback(
    (product) => dispatch({ type: "ADD", product }),
    []
  );

  const removeFromCart = useCallback(
    (product) => dispatch({ type: "REMOVE", product }),
    []
  );

  const value = { cart, addToCart, removeFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React, { memo, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductItem = memo(({ product }) => {
    console.log("render")
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const qty = cart[product.id] || 0;

  return (
    <li>
      {product.name} ({qty})
      <button onClick={() => addToCart(product)}>+</button>
      {qty > 0 && <button onClick={() => removeFromCart(product)}>-</button>}
    </li>
  );
});

export default ProductItem;

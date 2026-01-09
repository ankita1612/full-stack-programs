import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = [
  { id: "1", name: "Audi" },
  { id: "2", name: "BMW" },
  { id: "3", name: "Chevrolet" },
  { id: "4", name: "Citroen" },
  { id: "5", name: "Hyundai" },
];

function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id}>
          {p.name}
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", payload: p })
            }
          >
            +
          </button>
        </div>
      ))}

      <hr />

      <h2>Cart Items</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id}>
          {item.name} — Qty: {item.qty}
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item.id,
              })
            }
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;

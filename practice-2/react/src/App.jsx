import './App.css'
import { CartProvider } from "./context/CartContext";
import ProductList from "../src/components/ProductList"
import Cart from "../src/components/Cart"

function App() {

  return (
    <CartProvider>
      <Cart/>
      <ProductList />
    </CartProvider>
  )
}

export default App

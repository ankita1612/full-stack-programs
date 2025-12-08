import {CartProvider} from "./context/CartContext"
import ProductList from "./components/ProductList"
import CartSidebar from "./layout/CartSidebar"
import Header from "./layout/Header"


function App() {
    return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 p-6 font-sans">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Header />
            <div className="mt-6">
            <ProductList />
            </div>
          </div>
          <div>
            <CartSidebar />
          </div>
        </div>
    </div>
    </CartProvider>
    )
}

export default App

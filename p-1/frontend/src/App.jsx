import Button from 'react-bootstrap/Button';
import Header from './layout/header'
import Footer from './layout/Footer'
import Content from './components/Content'
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ProductList from './components/ProductList'
import {UserProvider} from './context/Context';
import Cart  from './components/Cart'
import { CartProvider } from "./context/CartContext";
import ProductAdd from './components/ProductAdd'
import ProductEdit from './components/ProductEdit'
import PrivateRoutes from './components/PrivateRoutes'

//https://bootswatch.com/
function App() {
  return (
    <>
    <BrowserRouter>
     <UserProvider>
      <CartProvider>
      <Header/>
      
        {/* Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
           <Route element={<PrivateRoutes />}>
            <Route path="/product_list" element={<ProductList />} />
            <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/cart" element={<Cart />} />
           </Route> 
        </Routes>
      
     
      <Footer/>
      </CartProvider>
      
      </UserProvider>   
      </BrowserRouter>
    </>
  )
}

export default App

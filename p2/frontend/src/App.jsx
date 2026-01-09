import Button from 'react-bootstrap/Button';
import {Container,Card} from 'react-bootstrap';
import Header from './layout/Header'
import Footer from './layout/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Card >
      <Header/>      
      <Card.Body>
         <Container className="mt-5">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Card.Body>
      <Footer/>
    </Card>
  );
}

export default App;
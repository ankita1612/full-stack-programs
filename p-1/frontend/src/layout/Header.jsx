import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/Context';
import { useNavigate } from "react-router";

function Header() {
   const { userData, setUserData } = useContext(UserContext);
     let navigate = useNavigate();


   const handleLogout =()=>{
      localStorage.removeItem("user_data")
      setUserData(null)
      navigate("/home");
   }
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <NavDropdown title="Product" id="basic-nav-dropdown">
              <NavDropdown.Item href="/product_list">List</NavDropdown.Item>
              <NavDropdown.Item href="#add_e">Add</NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div>{userData?(
          <> Welcome {userData.name} | <button onClick={handleLogout}>Logout</button></>
      ):("gust user")}</div>
    </Navbar>
            

    </>
  );
}

export default Header;


import { useState } from 'react'
import Head from './components/Header'
import Footer from './components/Footer'
import Registration from './components/Registration'
import Login from './components/Login'
import Employee from './components/Employee'
import HOME from './components/HOME'

import Card from 'react-bootstrap/Card';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container'

function App() {

  return (
    <>
    <BrowserRouter>
      <Card >
        <Head></Head>
        <Card.Body>
          <Container>
          <Routes>
            <Route path="/" element={<HOME />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
          </Container>
        </Card.Body>
        <Footer></Footer>

      </Card>
    </BrowserRouter>
      
    </>
  )
}

export default App

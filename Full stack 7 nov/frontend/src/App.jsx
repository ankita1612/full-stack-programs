import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const PropertyList = lazy(() => import("./components/PropertyList"));
const EmployeeList = lazy(() => import("./components/EmployeeList"));
const Home = lazy(() => import("./components/Home"));


function App() {
  return (
    <Router>
      <Header />
       <Suspense fallback={<div>Loading...</div>}>
        <main style={{ minHeight: '80vh', padding: '1rem' }}>
          <Routes >
            <Route path="/" element={<Navigate to="/home" />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

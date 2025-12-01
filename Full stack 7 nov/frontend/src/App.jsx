import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { UserProvider } from "./context/UserContext";    //context API
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const PropertyList = lazy(() => import("./components/PropertyList"));
const EmployeeList = lazy(() => import("./components/Employee/EmployeeList"));
const Home = lazy(() => import("./components/Home"));
const StrictMode = lazy(() => import("./components/StrictMode"));
const HookEg = lazy(() => import("./components/HookEg"));
const UseMemoEg = lazy(() => import("./components/UseMemoEg"));
const Eg1 = lazy(() => import("./components/Eg1"));
const Eg2 = lazy(() => import("./components/Eg2"));
const Eg3 = lazy(() => import("./components/Eg3"));
const UseLayoutDemo = lazy(() => import("./components/UseLayoutDemo.jsx"));
const UseLayoutDemo1 = lazy(() => import("./components/UseLayoutDemo1.jsx"));

function App() {
  return (
    <UserProvider>
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
              <Route path="/strictMode" element={<StrictMode />} />
              <Route path="/hookEg" element={<HookEg />} />
              <Route path="/useMemoEg" element={<UseMemoEg />} />
              <Route path="/eg1" element={<Eg1 />} />
              <Route path="/eg2" element={<Eg2 />} />
              <Route path="/eg3/:action"   element={<Eg3 />} />    
              <Route path="/UseLayoutDemo"   element={<UseLayoutDemo />} />    
              <Route path="/UseLayoutDemo1"   element={<UseLayoutDemo1 />} />    
              
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

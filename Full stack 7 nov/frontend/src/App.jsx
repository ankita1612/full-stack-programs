import React, { Suspense, lazy } from "react";
import one from './assets/1.svg'
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
const ReactWindow  = lazy(() => import("./components/ReactWindow.jsx"));
const UseQuery  = lazy(() => import("./components/UseQuery.jsx"));
const UseDeferredValue  = lazy(() => import("./components/UseDeferredValue.jsx"));
const  UseTransition = lazy(() => import("./components/UseTransition.jsx"));
const  UseFormState = lazy(() => import("./components/UseFormState.jsx"));
const  UseForm = lazy(() => import("./components/UseForm.jsx"));
const  FormRerender = lazy(() => import("./components/FormRerender.jsx"));
function App() {

  var x = 5;

{
  let x = 100;  // shadows outer x
  console.log("==========>"+x); // 100
}

console.log("~~~~~~~~>"+x); // 5

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
              <Route path="/ReactWindow"   element={<ReactWindow />} />
              <Route path="/UseQuery"   element={<UseQuery />} />
              <Route path="/UseDeferredValue"   element={<UseDeferredValue />} />
              <Route path="/UseTransition"   element={<UseTransition />} />
              <Route path="/UseFormState"   element={<UseFormState />} />
              <Route path="/UseForm"   element={<UseForm />} />
              <Route path="/FormRerender"   element={<FormRerender />} />              
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

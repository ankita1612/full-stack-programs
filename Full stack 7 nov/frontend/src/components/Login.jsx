//npm install react-hook-form yup @hookform/resolvers axios
/*
react-hook-form → form handling
yup → validation schema
@hookform/resolvers → integrate yup with react-hook-form
axios → call backend API
*/

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { useForm  } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);   //contex API

  //console.log("Rerender")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  }); 

  const [fade, setFade] = useState(false);

  useEffect(() => {
    console.log('calling')
    if (error) {
      setFade(false);
      const timer = setTimeout(() => setFade(true), 2000); // fade after 2 sec
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSubmit = async (data) => {    
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data)     
        //console.log( JSON.stringify(res.data));
        //console.log(res.data.success)
          if (res.data.success === false) {            
            setError(res.data.message || "Login failed");
          } else {            
            const token = res.data?.data?.token;             
            console.log("Token:", token);
            sessionStorage.setItem("authToken", token);
            localStorage.setItem("userData",JSON.stringify({id:res.data.data.user._id ,name :res.data.data.user.name,email :res.data.data.user.email}));
            navigate('/employees');
            setUser(res.data.data.user);
          } 
    } catch (err) {      
      console.log(err)
      alert(err.response?.data?.message || 'something went wrong');       
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Login</h2>
      <div>
        {error && (<div className={`error-message ${fade ? 'fade-out' : ''}`}>    {error}  </div>)}
        <label>Email</label>
        <input type="email" {...register('email')} />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>
      </div>
      <button type="submit"  disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}

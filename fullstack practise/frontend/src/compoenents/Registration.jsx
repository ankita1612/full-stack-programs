import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Please enter name"),
  email: yup.string().email().required("Please enter email"),
  password: yup.string().min(8).max(32).required("Please enter password"),
  confirm_password: yup.string().min(8).max(32).required("Please enter confirm password").oneOf([yup.ref('password'), null], 'Passwords must match')

});

const App = () => {
  console.log("render")
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [msg,setMsg]=useState('')
  const onSubmitHandler = async (payload) => {
    
        const API_BASE_URL= "http://localhost:3000/"
        try{       
            const response = await axios.post(API_BASE_URL+'auth/registration', payload)            
            if(response.status === 200){
                if(response.data.success==false)
                {
                    setMsg(response.data.errors)
                    console.log(333)
                }
                else{
                    setMsg("Registration successful. Redirecting to home page..")                 
                    navigate('/Login')                    
                }                
            } else{
                console.log("else")
        
            }            
            console.log(222)
        }
        catch(e) 
        {
                console.log(e);
        }

        // reset();
    };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />
        <div className="error-msg">{msg}</div>
      Name : <input {...register("name")} placeholder="name" type="text"  />
      <div className="error-msg">{errors.name?.message}</div>
      <br />

      Email : <input {...register("email")} placeholder="email" type="email"  />
      <div className="error-msg">{errors.email?.message}</div>
      <br />
      
      Passwod : <input {...register("password")} placeholder="password" type="password" />
      <div className="error-msg">{errors.password?.message}</div>
      <br />

      Confirm Passwod : <input {...register("confirm_password")} placeholder="confirm_password" type="password" />
      <div className="error-msg">{errors.confirm_password?.message}</div>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default App;
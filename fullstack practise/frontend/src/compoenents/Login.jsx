import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import {UserContext} from "../hooks/UserContext"

const schema = yup.object().shape({
  email: yup.string().email("Email is require").required("Email is require"),
  password: yup.string().min(8).max(32).required("Password is require"),
});

const Login = () => {
  const {users , setUsers} = useContext(UserContext)
  const [msgParams] = useSearchParams();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const [pageError, setPageError] = useState(msgParams.get("msg") || "")
  const navigate = useNavigate()
    
  // useEffect(() => {      
  //     if(msgParams.get("msg")){  
  //       queueMicrotask(() => {setPageError(msgParams.get("msg") || "");
  //       })
  //     }     
  // }, [msgParams]);

  const onSubmitHandler = async(payload) => {
    
    try{
        const BACKEND_URL="http://localhost:3000/";
        payload.user_type="employee"
        const result = await axios.post(BACKEND_URL+'auth/login', payload)
        setPageError(result?.data?.message || "")
        if(result.data.success==true)
        {     
          const user_data={name:result?.data?.data?.name,email:result?.data?.data?.email,id:result?.data?.data?._id}     
            localStorage.setItem("user_data",JSON.stringify(user_data))
            localStorage.setItem("token", result?.data?.data?.token || '')
            setUsers(user_data)
            navigate("/employee")
        }     
    }
    catch(e){        
        setPageError(e?.message || "something worong")
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />

      <div className="error-msg">{pageError}</div>

      <input {...register("email")} placeholder="email" type="email" />
      <div className="error-msg">{errors.email?.message}</div>
      <br />

      <input {...register("password")} placeholder="password" type="password" />
      <div className="error-msg">{errors.password?.message}</div>
      <br />
    {/* {JSON.stringify(watch(), null, 2)} */}
      <button type="submit">Sign in</button>
      {/* <button type="button"  onClick={() =>resetPage()}>Reset</button>
      <button type="button"  onClick={resetPage}>Reset</button> */}
    </form>
  );
};

export default Login;
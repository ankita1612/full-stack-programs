import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button, Col, Form, InputGroup,Row,Container  } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router";
import { UserContext } from '../context/Context';

// Define Yup Schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required")
});

const Login = () => {
  console.log("rerender")
  let navigate = useNavigate();
  const {userData,setUserData} = useContext(UserContext);

  const { register, handleSubmit,setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("+++userData")
  console.log(userData)
  console.log("userData end+++")

  const onSubmit = async(data) => {
    try{
        console.log("Form Submitted:", data);
        const userData = {
                email:data.email,
                password:data.password
            };

        // Make POST request to send data
        const result= await axios.post("http://localhost:3000/api/signin", userData)
        if(result.status==200)
        {
           if(result.data.successs==false) 
           {
              setError("password",{message:result.data.message})
           }
           else
           {
            console.log(result.data.user)
            const user_data={"name":result.data.user.firstName,token:result.data.user.token,id:result.data.user._id}
            setUserData(user_data)
            localStorage.setItem('user_data', JSON.stringify(user_data));
            navigate("/employee");
           }
          
        }
    }
    catch(e){   
      console.log('Error fetching data:', e);  
      setError("password", {type: "manual",message: e.message,})
    }      
  };
  return (
    <Container >
      ---{JSON.stringify(userData)}---
    <Form onSubmit={handleSubmit(onSubmit)}>
       
        <Form.Group  as={Col} md="4" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" isInvalid={!!errors.email} {...register("email")} />        
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>     

        <Form.Group as={Col} md="4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" isInvalid={!!errors.password} {...register("password")} />                
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>
        
        <Button type="submit">Login</Button>
    </Form>
    </Container>
  );
};

export default Login;
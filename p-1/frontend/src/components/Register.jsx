import React, { useState,useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from '../context/Context';

// Define Yup Schema
const schema = yup.object({
  first_name: yup.string().required("first_name is required"),
  last_name: yup.string().required("last_name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Min 10 char required").required("password is required"),
  confirmPasasword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
    const {userData,setUserData} = useContext(UserContext);
  
  const navigate = useNavigate()
  const { register, handleSubmit, setError,formState: { errors } } = useForm({
    resolver: yupResolver(schema),
     defaultValues: {
      first_name: 'aan',
      last_name: 'kki',
      email: "ankita@yopmail.com",
      password :"Aspl@123",
      confirmPasasword :"Aspl@123"
    }
  });
  console.log("+++userData")
  console.log(userData)
  console.log("userData end+++")
  const onSubmit = async(data) => {
    console.log("Form Submitted:", data);
    try{
        const newUser = {
              "firstName":data.first_name,
              "lastName":data.last_name, 
              "email":data.email,             
              "password": data.password,
              "confirmPasasword": data.confirmPasasword
        };

        // Make POST request to send data
        const result = await axios.post("http://localhost:3000/api/signup", newUser);
        if(result.status==200)
        {
          console.log(result.data)
          if(result.data.successs==true)
          {     
            console.log("Suceess")
            return navigate("/login");
          }
          else{
            setError("email", {message: result.data.message});
          }
        }
        else{
          console.log("some thing wronmg")
        }
      }
      catch(e){
        console.log(e.message)
      }           
  };
return (
		<Container  > ---{JSON.stringify(userData)}---
		 <Form onSubmit={handleSubmit(onSubmit)} noValidate>          
            <Form.Group as={Col} md="4" >
              <Form.Label>First name</Form.Label>
              <Form.Control isInvalid={!!errors.first_name} {...register("first_name")}/>
              <Form.Control.Feedback type="invalid">{errors.first_name?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4"  >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" isInvalid={!!errors.email}  {...register("email")} />
               <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Last Name</Form.Label>
              <Form.Control  placeholder="Enter Last Name" isInvalid={!!errors.last_name}  {...register("last_name")} />
              <Form.Control.Feedback type="invalid">{errors.last_name?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" isInvalid={!!errors.password}  {...register("password")} />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Enter confirm password" isInvalid={!!errors.confirmPassword}  {...register("confirmPassword")}  />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
            </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
		</Container>
	);  
};

export default Register;
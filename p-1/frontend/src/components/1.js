import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from "react-bootstrap";

// Define Yup Schema
const schema = yup.object({
  first_name: yup.string().required("first_name is required"),
  last_name: yup.string().required("last_name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Min 10 char required").required("password is required"),
  confirmPasasword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
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
		<Container className="mt-5">
		 <Form onSubmit={handleSubmit(onSubmit)}>          
            <Form.Group
              as={Col} md="4" controlId="validationFormik101" className="position-relative">
              <Form.Label>First name</Form.Label>
              <Form.Control isInvalid={!!errors.first_name} {...register("first_name")}/>
              <Form.Control.Feedback type="invalid">{errors.first_name?.message}</Form.Control.Feedback>
            </Form.Group>
       
          <Button type="submit">Submit form</Button>
        </Form>
		</Container>
	);
  // return (
  //   <Container >
  //   <Form onSubmit={handleSubmit(onSubmit)}>
  //     <Form.Group className="mb-3" controlId="formBasicFirstName">
  //       <Form.Label>First name:</Form.Label>
  //       <Form.Control placeholder="Enter first name" isInvalid={!!errors.first_name} {...register("first_name")} />
  //       <Form.Control.Feedback type="invalid">{errors.first_name?.message}</Form.Control.Feedback>
  //     </Form.Group>

  //     {/* <div>
  //       <label>First name:</label>
  //       <input {...register("first_name")} />
  //       <p>{errors.first_name?.message}</p>
  //     </div> */}
  //     <div>
  //       <label>Last name:</label>
  //       <input {...register("last_name")} />
  //       <p>{errors.last_name?.message}</p>
  //     </div>

  //     <div>
  //       <label>Email:</label>
  //       <input {...register("email")} />
  //       <p>{errors.email?.message}</p>
  //     </div>

  //     <div>
  //       <label>Password:</label>
  //       <input  {...register("password")} />
  //       <p>{errors.password?.message}</p>
  //     </div>
      
  //     <div>
  //       <label>Confirm password:</label>
  //       <input  {...register("confirmPasasword")} />
  //       <p>{errors.confirmPasasword?.message}</p>
  //     </div>

  //     <button type="submit">Register</button>
  //   </Form>
  //   </Container>
  // );
};

export default Register;
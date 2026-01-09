import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';

import {Form,Col} from 'react-bootstrap';
const BACKEND_URL =import.meta.env.BACKEND_URL
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async(data) => {
    console.log({ data });
    try{
       const newPost = {
            'email':data.email,
            'password': data.password
        };
      const data =await axios.post(BACKEND_URL+"/register", newPost)
      //setResponseMessage("Post created successfully!");
      //reset();
    }
    catch(e)
    {
        console.log(e)
    }
  };
  return (
    <Form  noValidate  onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Group as={Col} md="4"  >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" {...register("email")} placeholder="name@example.com" isInvalid={!!errors.email}/>
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group  as={Col} md="4" >
        <Form.Label>password</Form.Label>
        <Form.Control type="password" {...register("password")} isInvalid={!!errors.password}/>
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>
      <button type="submit">Sign in</button>
    </Form>
  );
};

export default Register;
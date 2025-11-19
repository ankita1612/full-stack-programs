import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DevTool } from "@hookform/devtools";

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),  
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .matches(passwordRegex, 'Password must be min 8 chars, include 1 uppercase, 1 number, 1 lowercase')
    .required('Password is required'),
  confirmpassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Register() {  
  const navigate = useNavigate();
  const [error, setError] = useState("");  
  const { register, handleSubmit, control , getValues, setValue, reset, trigger, formState: { errors,isSubmitting, isSubmitted, isSubmitSuccessful, submitCount, touchedFields, dirtyFields, isDirty,isValid } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues:{
      name:"ankita 12345"
    }
  });

  console.log({isSubmitting, isSubmitted, isSubmitSuccessful, submitCount})
  console.log({touchedFields, dirtyFields, isDirty,isValid});
 //without page rerender it give me values
  const hangelGetValues = ()=>{
        const formValue = getValues(["name","email","address.city","address.pincode"]);
        console.log('formValue',formValue)
  }
  //without page rerender it set me values
  const hangelSetValues = ()=>{
        setValue("name","")// setValue("name","ankita")
        setValue("email","",
        {
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true
        })
  }
  const handleReset = ()=>{
        reset();
    }
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL+'/auth/register', data);      
      if (res.data.success === false) {                    
          setError(res.data.message || "Registration failed");
        } else {                   
          navigate('/login');
        } 
      } catch (err) {      
        alert(err.response?.data?.message || 'something went wrong');       
      }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Register</h2>
      {error && (<div className="error-message">    {error}  </div>)}
      
      <div>
        <label>Name</label>
        <input type="name" {...register('name')} />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" {...register('confirmpassword')} />
        <p style={{ color: 'red' }}>{errors.confirmpassword?.message}</p>
      </div>      
      <button type="submit" disabled={!isDirty || !isValid} >Register</button>{isDirty}=={isValid }
      <button type="button" onClick={hangelGetValues}>GetValues</button>
      <button type="button" onClick={hangelSetValues}>SetValues</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
    {/* Hook Form DevTool */}
      <DevTool control={control} />
      </>
  );
}

import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios"; 

const schema = yup.object().shape({
  name: yup.string().required(),
  salary: yup.string().required(),
  email: yup.string().email().required(),
  status: yup.string().required(),
  
});

function EmployeeRow({ data,showMessage }) {
 // console.log("rerender")
  const BACKEND_URL="http://localhost:3000/";
  const [mode,setMode] = useState("view")
   const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: data.name, email: data.email, salary : data.salary, status: data.status,desc: data.desc  }
  });
  
  const deleteRecord = async() =>{
    if(confirm("sure"))
    {
      try{
        const token =localStorage.getItem("token")
        const headers = { 'Authorization': token }; // auth header with bearer token
        const response = await axios.delete(BACKEND_URL+'employee/'+data._id, { headers })
        showMessage(response.data.message, response.data.success == true?"success":"error");

        if(response.data.success == true)
        {
          console.log("ifff")
        }
        else{        
          console.log("Else")
          console.log("~>"+Array.isArray(response.data.message))
        }
      }
      catch(e){
        console.log(e?.message)
      }
        
    }
  }
  const editSaveEmp = async(payload) => {
    
    try{
      const token =localStorage.getItem("token")
      const headers = { 'Authorization': token }; // auth header with bearer token
      
      const response = await axios.put(BACKEND_URL+'employee/'+data._id, payload, { headers })
      //console.log(JSON.stringify(response.data.message))      
      showMessage(response.data.message, response.data.success == true?"success":"error");
      if(response.data.success == true)
      {
        console.log("ifff")
        console.log("reset form")
        resetForm()        
      }
      else{        
        console.log("Else")
        console.log("~>"+Array.isArray(response.data.message))
      }
      
    } 
    catch(e)
    {
      console.log(e?.message)
    }
      
  };
  const changeEdit = () =>{
    setMode("edit")
  }
  const resetForm = () =>{
    reset()
    setMode("view")
   

  }

  const saveData =() =>{
     setMode("view")
  }
  return (    
    <tr>
      {mode =="view"?(
          <>
          <td>{data._id}</td>
          <td>{data.name}</td>      
          <td>{data.salary}</td>      
          <td>{data.email}</td>
          <td>{data.status}</td>
          <td>{data.desc}</td>
          <td><button onClick={changeEdit}>Edit</button></td>
          <td><button onClick={deleteRecord}>Delete</button></td>
          </>
        ):(
          <>
          <td>{data._id}</td>
          <td>
            <input {...register("hidden", { value: "hidd_val" })} type="hidden" />
            <input type="text" {...register("name")} /> 
            <div className='error-msg'>{errors.name?.message}</div>
          </td>       
          <td>
            <input type="text" {...register("salary")} /> 
            <div className='error-msg'>{errors.salary?.message}</div>
          </td>        
          <td>
            <input type="text" {...register("email")} /> 
            <div className='error-msg'>{errors.email?.message}</div>          
          </td>
          <td>        
            <select  {...register("status")} defaultValue={data.status} >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>          
            <div className='error-msg'>{errors.status?.message}</div>          
          </td>
           <td>
            <textarea {...register("desc")}></textarea>
            <div className='error-msg'>{errors.desc?.message}</div>
            </td>       
            <td>
                <button onClick={handleSubmit(editSaveEmp)}>Save</button> 
                <button onClick={resetForm}>Cancel</button>           
          </td>
          
        </>  
      )}
      
    </tr>
    

  )
}

export default EmployeeRow
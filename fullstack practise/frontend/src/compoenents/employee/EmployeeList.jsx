import React, { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeRow from "./EmployeeRow"
import {UserContext} from '../../hooks/UserContext'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(8).max(32).required(),
  email: yup.string().email().required(),  
  salary: yup.string().required(),
  status: yup.string().required(),
});

function EmployeeList() {
    const {users,setUsers}=  useContext(UserContext);  
    const [data, setData] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [msgType, setMsgType] = useState("error")    
    const [showAddForm, setShowAddForm] = useState(false)    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
    });
    const [pageNo, setPageNo] = useState()    
    const [limit, setLimit] = useState(5)
    const [totalRecord, setTotalRecord] = useState()
    const [totalPages, setTotalPages] = useState()
   
    const onSubmitHandler = async(payload) => {
      try{       
        const token =localStorage.getItem("token")
        const headers = { 'Authorization': token }; // auth header with bearer token
          const BACKEND_URL="http://localhost:3000/";

        const response = await axios.post(BACKEND_URL+'employee', payload, { headers })
        console.log("========>"+JSON.stringify(response.data.message))      
        
        if(response.data.success == true)
        {
          console.log("ifff")
          console.log("reset form")
          showMessage(response.data.message, response.data.success == true?"success":"error");
          reset();    
          setShowAddForm(false)   
        }
        else{        
          console.log("Else")
          if(Array.isArray(response.data.message)){
              const final_msg=response.data.message.map(e => {
                  return e.msg
              });
            showMessage(final_msg.join("\n"), response.data.success == true?"success":"error");
          }
          else
          {
            showMessage(response.data.message, response.data.success == true?"success":"error");
          }

        }
        
      }
      catch(e)  
      {
        console.log(e?.message)
      }

  };
    const fetch = async()=>{
      let token =localStorage.getItem("token")
      const API_BASE_URL= "http://localhost:3000/";
      try{
            const response = await axios.get(API_BASE_URL+"employee", {                
              headers: { Authorization: `Bearer ${token}` }, // example for auth
            });            
            if(response.data.success){
                setData(response.data.data)
                setPageNo(response.data.page)
                setLimit(response.data.limit)
                setTotalRecord(response.data.totalRecords)
                setTotalPages(response.data.totalPages)
            }
            else{
                setErrorMsg(response.data.message)
            }
      }
      catch(e){
        console.log(e.error)
      }
    }   
    useEffect(()=>{                         
      const timer = setTimeout(() => fetch(), 1000); 
      return () => clearTimeout(timer);
    },[])
    
  const showMessage = (msg,msg_type) =>{    
    setErrorMsg(msg)
    setMsgType(msg_type)
    fetch()
  }
  return (
    <>
    <div>EmployeeList</div>
    <div className={msgType=='error'?'error-msg':'success-msg'} style={{ whiteSpace: "pre-line", color: "red" }}>[{Object.keys(errors).length}]{Object.keys(errors).length === 0 ? errorMsg:""}</div>
    <button onClick={()=>setShowAddForm(true)}> Add Employee</button>
    { showAddForm && (
      <div>
        
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Lets sign you in.</h2>
          <br />
          
          Name :<input {...register("name")} placeholder="name" />
          <div className="error-msg">{errors.name?.message}</div>

          Email : <input {...register("email")} placeholder="email" type="email" />
          <div className="error-msg">{errors.email?.message}</div>

          Salary : <input {...register("salary")} placeholder="salary" />
          <div className="error-msg">{errors.salary?.message}</div>

          Status : <input {...register("status")} placeholder="status" />
          <div className="error-msg">{errors.status?.message}</div>
          <br />

          <button type="submit">Add</button>
        </form>
      </div>)
    }

    <table border="1" width="100px">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Salary</th>        
          <th>Email</th>
          <th>Status</th>   
          <th>Desc</th>        
          <th>Edit</th>        
          <th>Delete</th>        
        </tr>      
     </thead>    
     <tbody>
        {data.map((d) => (
            <EmployeeRow key={d._id} data={d} showMessage={showMessage} />
        ))}
      </tbody>        
    </table>
  
    </>
  )
}

export default EmployeeList
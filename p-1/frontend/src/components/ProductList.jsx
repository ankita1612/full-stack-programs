import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import PropertyItem from './PropertyItem'
const API_URL=import.meta.env.VITE_API_URL
function ProductList() {
   const [property, setProperty]=useState()
   const [msg, setMsg]=useState('')
   
   const deleteUser =async(id) =>{     
     try{
            const result = await axios.delete(API_URL+"/property/"+id)
            console.log(result.data.data)

            if(result.status==200){
                if(result.data.success==true){
                  fetchData()
                  setMsg(result.data.message);
                }                
            }
            else
            {
              setMsg(result.data.message);
            }
          }
          catch(e){
            console.log(e)
            setMsg("Something went wrong");
          }    
   }

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {setMsg('')}, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [msg]);
   const fetchData = async() =>{
          try{
            const result = await axios.get(API_URL+"/property")
            console.log(result.data.data)

            if(result.status==200){
                if(result.data.success==true){
                  setProperty(result.data.data);
                }                
            }
          }
          catch(e){
            console.log(e)
          }         
        }       
   useEffect(() => {
        fetchData();
        //setTimeout(()=>{fetchData()},100)
    }, []); 


  return (
        <div>
            <h1>property</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', color:'red'}}>[[{msg}]]</div>
            <Link to='/product/add' className="btn btn-sm btn-success mb-2">Add Property</Link> 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '20%' }}>desc</th>
                        <th style={{ width: '20%' }}>stock</th>
                        <th style={{ width: '20%' }}>single_image</th>
                        <th style={{ width: '20%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {property && property.map(p =>
                        (<PropertyItem key={p._id} item={p} deleteUser={deleteUser}/>)
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList
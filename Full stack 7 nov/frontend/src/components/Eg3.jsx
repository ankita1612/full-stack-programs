import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";


export default function Eg3() {
//case : 1
    //http://localhost:5173/eg3/10
    //<Route path="/eg3/:id"  element={<Eg3 />} />
    //<NavLink to="/eg3/10" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
    //const {id} = useParams()
    //console.log(id)  
//case :2
    //http://localhost:5173/eg3 OR //http://localhost:5173/eg3/10
    //<Route path="/eg3"  element={<Eg3 />} />
    //<Route path="/eg3/:id?"  element={<Eg3 />} />
    //<NavLink to="/eg3" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
    //<NavLink to="/eg3/10" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
    //const {id  } = useParams()
    //console.log(id)  //undefined if not get

//case :3
    //http://localhost:5173/eg3/10/add
    //<Route path="/eg3/:id/:axn"  element={<Eg3 />} />    
    //<NavLink to="/eg3/100/add" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
    //const {id,axn  } = useParams()
    //console.log(id +"==="+ axn)  //undefined if not get
   
//case :4
    //http://localhost:5173/eg3?srh=a&sort=asc
    //<Route path="/eg3"  element={<Eg3 />} />    
    //<NavLink to="/eg3" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
    // const [querystr] = useSearchParams()// must be [] ..not {}
    // console.log( querystr.get("srh") +"==="+querystr.get("sort"))  //undefined if not get
        
//case :5
    //http://localhost:5173/eg3/10?srh=a&sort=asc
    //<Route path="/eg3/:params"  element={<Eg3 />} />    
    //<NavLink to="/eg3/10" className={({ isActive }) => (isActive ? "active" : "")} style={{ marginRight: '1rem' }}>Eg3</NavLink>
     
    //const {params} = useParams()
    //console.log(params)  
    //const [querystr] = useSearchParams()// must be [] ..not {}
    //console.log( querystr.get("srh") +"==="+querystr.get("sort"))  //undefined if not get
//case :6 
    //http://localhost:5173/eg3/10?srh=a&sort=asc  
    //<Route path="/eg3/:action"   element={<Eg3 />} />    
    //<NavLink to="/eg3/add" >Eg3</NavLink>

    const location = useLocation();
    console.log(location) //{pathname: '/eg3/10', search: '?srh=a&sort=asc', hash: '', state: null, key: 'default'}
    console.log(location.search)



  return (
    <div></div>
  );
}

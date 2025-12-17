
import { BrowserRouter ,Routes, Route,Link , NavLink} from "react-router-dom";
import Registration from './compoenents/Registration'
import { useContext, useState } from "react";
import {UserContext} from './hooks/UserContext'
import Login from './compoenents/Login'
import Employee from "./compoenents/employee/EmployeeList"; 
import ProtectedRoute from "./routes/ProtectedRoute"
import BrokenComponent  from "./compoenents/BrokenComponent";
import ErrorBoundary from "./ErrorBoundary";
import MyBox from "./compoenents/MyBox";
import MyHeader from "./compoenents/MyHeader";
import ListVirtulization from "./compoenents/ListVirtulization";


function App() {
    const {users} = useContext(UserContext)
    const [cntr,setCntr] = useState(0)
    const msg="<script>hai<script>";
    const msg1="<img src='1.jpeg' onerror='alert(1)'>";
    const msg2="javascript:alert(1)";
    const userInput = "<img src=x onerror='alert(\"Hacked!\")'>";
    const Inputdata = "<h1>Hai</h1>";
    const y='alert(1)'
    const x='1.jpg'
   

    return (       
        <>
        <MyHeader></MyHeader>
        <div>Hai from start</div>
        <div>{msg}</div>
        <div>{msg1}</div>
       {/* [[<div><img src={x} onerror={y}></img></div>]] */}

        {/* --<div dangerouslySetInnerHTML={{ __html: userInput }} />-- */}
        --<div dangerouslySetInnerHTML={{ __html: Inputdata }} />--
        --<div> {Inputdata} </div>--
        

        <br></br><div><a href={msg2}>click me</a></div>
        <BrowserRouter>
        <nav>
            <ul>
                {users?
                    (<>
                        <li><NavLink className={({isActive}) => isActive ? "active-menu" : "pending"} to="/registration" end>Home</NavLink ></li>
                        <li><NavLink className={({isActive}) => isActive ? "active-menu" : "pending"} to="/employee">Employee</NavLink ></li>
                    </>):
                    (
                        <>
                            <li><NavLink className={({isActive}) => isActive ? "active-menu" : "pending"} to="/registration">Registration</NavLink ></li>
                            <li><NavLink className={({isActive}) => isActive ? "active-menu" : "pending"} to="/login">Login</NavLink ></li>                    
                        </>
                    )                  
                }
                
            </ul>
        </nav>
        {/*Implementing Routes for respective Path */}
        <Routes>
            <Route path="/" element={<Registration />} />                
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listVirtulization" element={<ListVirtulization />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/employee" element={<Employee />} />
            </Route>
        </Routes>
        </BrowserRouter>  
        {/* <ErrorBoundary>
            <BrokenComponent />
            <div>++++++++++++++++++++++++</div>
      </ErrorBoundary>    */}
        <div>{cntr}<button onClick={()=>setCntr((p)=>{return p+1})}>+</button></div>
         <MyBox >
            <p>This is children props</p>
        </MyBox>
        </>  
    );    
}

export default App;

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
function App() {
    const {users} = useContext(UserContext)
    const [cntr,setCntr] = useState(0)
    return (       
        <>
        <MyHeader></MyHeader>
        <div>Hai from start</div>
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
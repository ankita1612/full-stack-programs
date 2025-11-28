
import { BrowserRouter ,Routes, Route,Link , NavLink} from "react-router-dom";
import Registration from './compoenents/Registration'
import { useContext } from "react";
import {UserContext} from './hooks/UserContext'
import Login from './compoenents/Login'
import Employee from "./compoenents/employee/EmployeeList"; 
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
    const {users} = useContext(UserContext)
    
    return (        
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
    );    
}

export default App;
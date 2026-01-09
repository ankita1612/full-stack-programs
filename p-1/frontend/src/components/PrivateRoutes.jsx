import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const savedUser = localStorage.getItem("user_data");
    let auth = '';
    if (savedUser) 
    {
        auth= JSON.parse(savedUser);        
    }
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
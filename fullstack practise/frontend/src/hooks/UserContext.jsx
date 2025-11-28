import { useEffect } from "react";
import { createContext, useState } from "react"

export const UserContext = createContext();
export const UserProvider = ({children}) =>{   
    const [users,setUsers]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(() => {          
         const savedUser = localStorage.getItem("user_data");         
         if (savedUser) setUsers(JSON.parse(savedUser));
         setLoading(false)
    }, []);
   
    return ( <UserContext.Provider value={{users,setUsers,loading,setLoading}} >
                {children}
            </UserContext.Provider>
    )
}



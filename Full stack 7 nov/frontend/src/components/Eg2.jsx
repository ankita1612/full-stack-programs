import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function Eg2() {
 
  const [data, setData] = useState(null);
  //{'name':'ankita','email':'ankitayopmal.com'}
  
const  incr= async() =>{
      const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
      console.log(res)
      setData(res.data)
      
  }
  // 🔹 Fetch API data
  useEffect(() => {
    incr()
  }, []);

  //

  return (
    <div>
    {data.name}
    {JSON.stringify(data)}
    </div>
  );
}

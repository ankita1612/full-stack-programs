import { useEffect, useId, useRef, } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useFetch } from '../hook/useFetch';

function MyBox() {
  console.log("Rerender")
 
  const [timer,setTimer] = useState(0)  
    const intervalRef = useRef(null);
    const id = useId();
  console.log("-->"+id)
      const id1 = useId();
  console.log("1-->"+id1)

    // const mathRef = useRef(Math.random());
    // console.log("mathRef -->"+mathRef.current)
    // const rand=Math.random();
    // console.log("rand -->"+rand)

  
   const startTimer = (action) => {
        if (action === "start") {
            if (intervalRef.current) return; // prevent multiple intervals
            intervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
            }, 1000);
        }
        else if (action === "pause") {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        else if (action === "reset") {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setTimer(0);
        }
    };
   useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
 const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="box">
        {intervalRef.current}---{timer}
            <button onClick={()=>startTimer("start")}>Start</button>
            <button onClick={()=>startTimer("reset")}>Reset</button>
            <button onClick={()=>startTimer("pause")}>Pause</button>
      {/* <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul> */}
     
    </div>
  );
}
export default MyBox;
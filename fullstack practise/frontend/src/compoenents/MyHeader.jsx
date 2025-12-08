import { useEffect, useRef } from "react";
import { useReducer } from "react";
import { useState } from "react";

function MyBox() {
  console.log("Rerender")
  
  const [timer,setTimer] = useState(0)  
    const intervalRef = useRef(null);

  
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

  return (
    <div className="box">
        {intervalRef.current}---{timer}
            <button onClick={()=>startTimer("start")}>Start</button>
            <button onClick={()=>startTimer("reset")}>Reset</button>
            <button onClick={()=>startTimer("pause")}>Pause</button>

     
    </div>
  );
}
export default MyBox;
import { useState } from "react";

function MyBox() {
  console.log("Rerender")
  const [cntr,setCntr] = useState()
  const [cntr1,setCntr1] = useState()
  const handleClick = ()=>{
    setTimeout(() => {
      setCntr((p)=> p+1)
      setCntr1(cntr)  
    }, 2000);
    
    
    
  }
  return (
    
    
    <div className="box">
      <button onClick={handleClick}></button>
    </div>
  );
}
export default MyBox;
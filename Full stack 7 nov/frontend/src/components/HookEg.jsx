import React, { useState,useCallback } from 'react'

function HookEg() {
  const [cntr,setCntr] =useState(0)
  console.log("parent rerender")
  const incrCntr = useCallback(() => {
    setCntr((prev) => prev + 1);
  }, []);


  return (
    <>
    <div>HookEg</div>
    {cntr}
    
    <div style={{ display: "flex", gap: "10px"}}>

        <button onClick={incrCntr}>+</button>
        <button onClick={()=> setCntr((p) =>p-1 )}>-</button>
        <button onClick={()=>setCntr(0)}>reset</button>
    </div>
    {/* <Child></Child> */}
     <ChildWithCallBack onClick={incrCntr} />
    </>
    
  )
}


const ChildWithCallBack = React.memo((props) =>{
    console.log("ChildWithCallBack")
    return (<>
        <hr/>
        <button onClick={props.onClick}>+</button>        
    </>)
})

const  Child = React.memo( ()=> {
    console.log("Child is rendaring")
    return "<h1>This is child hook</h1>"
})

export default HookEg
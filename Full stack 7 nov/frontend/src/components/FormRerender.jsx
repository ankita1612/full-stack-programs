import React, { useState, useMemo, useCallback } from "react";

export default function FormRerender() {
    const [cnt, setCnt]= useState(0)
    const [cnt2, setCnt2]= useState(0)
    console.log("rerender")  
    const addstyle = useMemo(() =>{
        console.log("style render")
        return {color:"pink"}
    },[])

    // function demoNormal() {
    //   console.log(arguments[2]); // ✔ Works
    // }
    // demoNormal(10, 20, 30);
    function normal(){}
    console.log("Prototyoe noral start")
console.log(normal.prototype); // {}
console.log("Prototyoe noral end")

const obj = {
  name: "Margini",
  sayHi: function() {    setTimeout(function() {      console.log(this.name);    }, 1000);  }
};
console.log("+++++")
obj.sayHi();
console.log("+++++")

const obj1 = {
  name: "Ankita",
  sayHi: function() {    setTimeout(() => {      console.log(this.name);    }, 1000);  }
};
console.log("---")
obj1.sayHi(); //
console.log("---")

// const arrow = () => {};
// console.log("Prototyoe arrow start")
// console.log(JSON.stringify(arrow.prototype));
// console.log("+++")
// console.log(sayHi); // ❌ TypeError: sayHi is not a function
// console.log("+++")

// var sayHi = () => {
//   console.log("Hello");
// };
    const handleClick = () =>{
      console.log("handleClick rerender")
          setCnt2(cnt2+1)
    }
  return (<>   
        <div style={{color:"red"}}>hai</div>
        <div style={addstyle}>bye</div>
        <div>{cnt}</div>
        <button onClick={()=>setCnt(()=>{console.log("inline cntr");  return cnt+1})}>click me</button><br></br>

        <button onClick={handleClick}>click me</button>
        {cnt2}
    </>
  );
}

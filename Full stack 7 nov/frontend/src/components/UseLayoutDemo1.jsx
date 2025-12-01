import React, { useRef, useLayoutEffect, useState } from "react";

export default function UseLayoutDemo() {
    const inputRef = useRef();

  useLayoutEffect(() => {
    inputRef.current.focus(); // focus before paint
  }, []);

  return (<>  
    <div  >
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i}>
            hai <br />
          </div>
        ))}
      </div>  
   <input ref={inputRef} /></> );

}

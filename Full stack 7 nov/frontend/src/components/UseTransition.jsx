import React, { useState, useTransition } from "react";


export default function SearchWithTransition() {
  const [list, setList] = useState([]);
  const [input, setinput] = useState("");
  const [isPending, startTransition] = useTransition(false);
  const LIST_SIZE=2000
  const handleChange = (e) => {
    setinput(e.target.value);
    startTransition(() => {
        console.log("inside")
        const l = [];
        for (let i = 0; i < LIST_SIZE; i++) {
          l.push(e.target.value);
        }
        setList(l);
    });
  }

return (
  <>
    <input type="text" value={input} onChange={handleChange} />

    {isPending
      ? "Loading..."
      : list.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
  </>
)
}

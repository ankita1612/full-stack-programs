import React,{ useState, useCallback } from "react";

export default function HookEg() {
  const [count, setCount] = useState(0);
    console.log("Parent Rendered");


  // useCallback ensures same function reference across renders
  const incrCounter = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);



  return (
    <>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <button onClick={incrCounter}>parent Button</button>

      <Child onIncrease={incrCounter} />
    </>
  );
}

// ------------ Child Component (same page) ---------------
const Child = React.memo ((prop) => {
  console.log("Child Rendered");

  return (
    <>
      <hr />
      <h2>Child Component</h2>
      <button onClick={prop.onIncrease}>Increase from Child</button>
    </>
  );
});

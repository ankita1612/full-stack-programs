// import { useEffect } from "react";
// import axios from "axios";

// export default function StrictMode() {
//   useEffect(() => {
//     console.log("API called");
//     axios.get("https://jsonplaceholder.typicode.com/posts/1")
//       .then(res => console.log("✅ API Response"))
//       .catch(err => console.log("❌ API Error"));
//   }, []);
//   return <h1>Strict Mode Demo</h1>;
// }

import { useEffect, useRef } from "react";

 export default function StrictMode() {
    const inputRef = useRef(null);

//   useEffect(() => {
//   console.log("Mounted");
//   const id = setInterval(() => console.log("Interval fired"), 1000);
//  // return () => clearInterval(id);
// }, []);

  useEffect(() => {
    console.log("effect run");
    const handler = () => console.log("clicked");
    window.addEventListener("click", handler);

    // return () => window.removeEventListener("click", handler);
  }, []);
  return <><h1>Strict Mode Demo</h1>  <input ref={inputRef} />
</>;
}

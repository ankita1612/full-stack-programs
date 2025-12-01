
import { useState } from "react";
import Modal from "../model/Model";

function Home() {
  
  var a=10;
   var a=20
  // //function x()
  // {
  //   let a=20
  //   console.log("i==>"+a)
  // }
  // // x()
  console.log("o==>"+a)
  
  // fn()
  //   var fn = () =>{console.log("fn call")}
    const [open, setOpen] = useState(false);
    const handleParentBubbling = () => {  console.log("Bubbling :Parent clicked");  };
    const handleChildBubbling = () => {    console.log("Bubbling :Child clicked");  };
    const handleParentCapture = () => {console.log("Capture : Parent clicked");}
    const handleChildCapture = (e) => {    e.stopPropagation();
      console.log("Capture : Child clicked (bubbling stopped)");
    };

    console.log("str->"+isNaN("str"))
    console.log("NAN->"+isNaN(NaN))
    console.log("undefined->"+isNaN(undefined))
    console.log("'12'->"+isNaN("12"))
    console.log("12->"+isNaN(12))

  return (
    <>
      <h1>Portal Example</h1>
          <div onClick={handleParentBubbling} style={{ border: "2px solid red", padding: 20 }}>
            Parent
            <div onClick={handleChildBubbling} style={{ border: "2px solid blue", marginTop: 10, padding: 10 }}>Child</div>
          </div>

          <div onClick={handleParentCapture} style={{ border: "2px solid red", padding: 20 }}>
            Parent
            <div onClick={handleChildCapture} style={{ border: "2px solid blue", marginTop: 10, padding: 10 }}>Child</div>
          </div>          
      <button onClick={() => setOpen(true)}>click here to open Modal</button>
      {open && (
        <Modal>
              <div>Model is opem now</div>
              <button onClick={() => setOpen(false)}>Close model</button>          
        </Modal>
      )}
    </>
  );
}

export default Home;

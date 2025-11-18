
import { useState } from "react";
import Modal from "../model/Model";

function Home() {
  
    const [open, setOpen] = useState(false);
  return (
    <>
      <h1>Portal Example</h1>
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

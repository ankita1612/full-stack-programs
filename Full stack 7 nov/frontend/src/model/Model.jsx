import React from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div style={{
      background: "rgba(0,0,0,0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

export default Modal;

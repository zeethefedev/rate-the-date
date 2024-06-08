import React from "react";
import "../style/SubComponent.css";

function Dialog(props) {
  const { open, dialogAnimation, children } = props;

  return (
    <div>
      {open && (
        <div
          className={`overlay-wrapper ${
            dialogAnimation ? "fade-in" : "fade-out"
          }`}
          style={{ top: window.scrollY }}
        >
          <div className="dialog-overlay">
            <div className="dialog-overlay-content">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;

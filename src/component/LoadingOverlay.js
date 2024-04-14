import React from "react";
import "../style/SubComponent.css";

function LoadingOverlay({ open, message = "Loading..." }) {
  return (
    <div>
      {open && (
        <div className="loading-overlay-wrapper">
          <div className="loading-message">{message}</div>
        </div>
      )}
    </div>
  );
}

export default LoadingOverlay;

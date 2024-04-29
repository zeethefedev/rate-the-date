import React from "react";
import "../style/SubComponent.css";

function LoadingOverlay({ open, message = "Loading..." }) {
  return (
    <div>
      {open && (
        <div className="overlay-wrapper fade-in">
          <span class="loader"></span>
          <div className="loading-message">{message}</div>
        </div>
      )}
    </div>
  );
}

export default LoadingOverlay;

import React from "react";
import "../style/SubComponent.css";

function Dialog(props) {
  const {
    open,
    dialogAnimation,
    message = "Do you want to submit your form?",
    yesLabel = "Yes",
    noLabel = "No",
    handleYesClicked,
    handleNoClicked,
  } = props;

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
            <div className="dialog-overlay-content">
              <h1>{message}</h1>
              <div className="button-group">
                <button onClick={handleYesClicked}>{yesLabel}</button>
                <button onClick={handleNoClicked}>{noLabel}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;

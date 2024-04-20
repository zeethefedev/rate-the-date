import React from "react";
import "../style/SubComponent.css";

function Dialog(props) {
  const {
    open,
    message = "Do you want to submit your form?",
    yesLabel = "Yes",
    noLabel = "No",
    handleYesClicked,
    handleNoClicked,
  } = props;

  return (
    <div>
      {open && (
        <div className="dialog-overlay-wrapper" style={{ top: window.scrollY }}>
          <div className="dialog-overlay">
            <div className="dialog-overlay-content">
              <h1>{message}</h1>
              <div className="dialog-button-group">
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

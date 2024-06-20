import React from "react";
import Dialog from "./Dialog";

function ConfirmDialog(props) {
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
    <Dialog open={open} dialogAnimation={dialogAnimation}>
      <h1>{message}</h1>
      <div className="button-group">
        <button onClick={handleYesClicked}>{yesLabel}</button>
        <button onClick={handleNoClicked}>{noLabel}</button>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;

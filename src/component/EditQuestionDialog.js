import React from "react";
import "../style/SubComponent.css";
import SVGIcon from "./SVGIcon";
import { QUESTION_FIELDS } from "../utils/constant";
import Dialog from "./Dialog";

function EditInput(props) {
  const { fieldName, value, checked, disabled, handleChangeQuestion } = props;
  const matchedField = QUESTION_FIELDS.find(
    (field) => field.name === fieldName
  );
  const { type, label, placeholder, name } = matchedField;

  return (
    <label>
      {type === "text" && label}
      <input
        type={type}
        value={type === "text" && value}
        checked={type === "checkbox" && checked}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => handleChangeQuestion(event, name)}
      />
      {type === "checkbox" && label}
    </label>
  );
}

function EditQuestionDialog(props) {
  const { open, dialogAnimation, question, handleCloseEditDialog } = props;
  const { type, value, required, rigged, errorMessage } = question;
  return (
    <Dialog open={open} dialogAnimation={dialogAnimation}>
      <button className="close-button" onClick={handleCloseEditDialog}>
        <SVGIcon icon="close" />
      </button>
      <div className="dialog-overlay-form">
        <div className="dialog-overlay-input">
          <EditInput {...props} fieldName="value" value={value} />
          <EditInput {...props} fieldName="required" checked={required} />
          <EditInput
            {...props}
            fieldName="rigged"
            checked={rigged}
            disabled={type !== "yesno"}
          />
          <EditInput
            {...props}
            fieldName="errorMessage"
            value={errorMessage}
            disabled={!required}
          />
          {type === "yesno" && (
            <>
              {["yesLabel", "noLabel", "yesResponse"].map((prop) => (
                <EditInput
                  {...props}
                  fieldName={prop}
                  value={question[prop]}
                  disabled={prop === "yesResponse" && !rigged}
                />
              ))}
            </>
          )}
        </div>
        <button
          className="secondary-button secondary-button-red submit-button"
          onClick={handleCloseEditDialog}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}

export default EditQuestionDialog;

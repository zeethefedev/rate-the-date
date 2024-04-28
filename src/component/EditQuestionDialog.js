import React from "react";
import "../style/SubComponent.css";
import SVGIcon from "./SVGIcon";
import { QUESTION_FIELDS } from "../utils/constant";

function DialogInput(props) {
  const { fieldName, value, checked, disabled, handleChangeQuestion } = props;
  const matchedField = QUESTION_FIELDS.find(
    (field) => field.name === fieldName
  );

  return (
    <div>
      {matchedField && matchedField.type === "text" && (
        <label>
          {matchedField.label}{" "}
          <input
            type={matchedField.type}
            value={value}
            disabled={disabled}
            placeholder={matchedField.placeholder}
            onChange={(event) => handleChangeQuestion(event, matchedField.name)}
          />
        </label>
      )}
      {matchedField && matchedField.type === "checkbox" && (
        <label className="checkbox-label">
          <input
            type={matchedField.type}
            checked={checked}
            disabled={disabled}
            onChange={(event) => handleChangeQuestion(event, matchedField.name)}
          />
          {matchedField.label}
        </label>
      )}
    </div>
  );
}

function EditQuestionDialog(props) {
  const { open, dialogAnimation, question, handleCloseEditDialog } = props;
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
              <button className="close-button" onClick={handleCloseEditDialog}>
                <SVGIcon icon="close" />
              </button>
              <div className="dialog-overlay-form">
                <div className="dialog-overlay-input">
                  <DialogInput
                    {...props}
                    fieldName="value"
                    value={question.value}
                  />
                  <div>
                    <DialogInput
                      {...props}
                      fieldName="required"
                      checked={question.required}
                    />
                    <DialogInput
                      {...props}
                      fieldName="rigged"
                      checked={question.rigged}
                      disabled={question.type !== "yesno"}
                    />
                  </div>
                  <DialogInput
                    {...props}
                    fieldName="errorMessage"
                    value={question.errorMessage}
                    disabled={!question.required}
                  />
                  {question.type === "yesno" && (
                    <div>
                      <DialogInput
                        {...props}
                        fieldName="yesLabel"
                        value={question.yesLabel}
                      />
                      <DialogInput
                        {...props}
                        fieldName="noLabel"
                        value={question.noLabel}
                      />
                      <DialogInput
                        {...props}
                        fieldName="yesResponse"
                        value={question.yesResponse}
                        disabled={!question.rigged}
                      />
                    </div>
                  )}
                </div>
                <button
                  className="secondary-button secondary-button-red submit-button"
                  onClick={handleCloseEditDialog}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditQuestionDialog;

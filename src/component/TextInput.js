import React from "react";
import { FORM_MODE } from "../utils/constant";

import "../style/Question.css";
import Message from "./Message";

function TextInput(props) {
  const {
    inputValue,
    handleInputChange,
    editInput,
    mode,
    error,
    buttonLabel,
    onButtonClick,
    data,
  } = props;

  const { value, required, errorMessage, placeholder } = data;
  const isSetupForm = mode === FORM_MODE.QUESTION;

  return (
    <div className="field-wrapper">
      <div className="form-wrapper">
        <label>
          <h3 className="input-label">
            {value}
            {required && <span>*</span>}
          </h3>
          <div className="input-wrapper">
            <input
              type="text"
              disabled={isSetupForm}
              required={required}
              value={isSetupForm ? "" : inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
            ></input>
            {buttonLabel && (
              <button
                className="secondary-button secondary-button-red"
                onClick={onButtonClick}
                disabled={error}
              >
                {buttonLabel}
              </button>
            )}
          </div>
        </label>
        {error && <Message mode="error" message={errorMessage} />}
      </div>
      {editInput}
    </div>
  );
}

export default TextInput;

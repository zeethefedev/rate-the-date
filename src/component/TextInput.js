import React from "react";
import { FORM_MODE } from "../utils/constant";

import "../style/Question.css";
import Message from "./ErrorMessage";

function TextInput(props) {
  const {
    questionValue,
    inputValue,
    handleInputChange,
    required,
    index,
    editInput,
    mode,
    error,
    errorMessage,
    placeholder,
    buttonLabel,
    onButtonClick,
  } = props;

  return (
    <div key={index} className="field-wrapper">
      <div className="form-wrapper">
        <label>
          <h3 className="input-label">
            {questionValue}
            {required && <span>*</span>}
          </h3>
          <div className="input-wrapper">
            <input
              type="text"
              disabled={mode === FORM_MODE.QUESTION}
              required={required}
              value={mode === FORM_MODE.QUESTION ? "" : inputValue}
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

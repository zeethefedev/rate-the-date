import React from "react";
import { FORM_MODE, INITIAL } from "../utils/constant";

import "../style/Question.css";

function TextInput(props) {
  const {
    questionValue = INITIAL.TEXT_QUESTION,
    inputValue,
    handleInputChange,
    required,
    index,
    editInput,
    mode,
    error,
    errorMessage = "please enter a valid answer",
    placeholder,
    buttonLabel,
    onButtonClick,
  } = props;

  return (
    <div key={index} className="field-wrapper">
      <div className="form-wrapper">
        <label>
          <h1>
            {questionValue}
            {required && <span>*</span>}
          </h1>
          <div className="input-wrapper">
            <input
              type="text"
              disabled={mode === FORM_MODE.QUESTION}
              required={required}
              value={inputValue}
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
        {error && <div>{errorMessage || INITIAL.ERROR_MESSAGE}</div>}
      </div>
      {editInput}
    </div>
  );
}

export default TextInput;

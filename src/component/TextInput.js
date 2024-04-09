import React from "react";
import { FORM_MODE, INITIAL } from "../utils/constant";

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
  } = props;
  return (
    <div key={index} className="field-wrapper">
      {editInput}
      <label>
        <h1>
          {questionValue}
          {required && <span>*</span>}
        </h1>
        <input
          type="text"
          disabled={mode === FORM_MODE.QUESTION}
          required={required}
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </label>
      {error && <div>{errorMessage}</div>}
    </div>
  );
}

export default TextInput;

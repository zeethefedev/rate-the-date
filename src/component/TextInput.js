import React from "react";
import { FORM_MODE, INITIAL } from "../utils/constant";

function TextInput(props) {
  const {
    questionValue = INITIAL.TEXT_QUESTION,
    required,
    index,
    editInput,
    mode,
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
        ></input>
      </label>
    </div>
  );
}

export default TextInput;

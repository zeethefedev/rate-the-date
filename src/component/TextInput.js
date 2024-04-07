import React from "react";
import { INITIAL } from "../utils/constant";

function TextInput({
  questionValue = INITIAL.TEXT_QUESTION,
  required,
  index,
  editInput,
}) {
  return (
    <div key={index} className="field-wrapper">
      {editInput}
      <label>
        <h1>{questionValue}</h1>
        <input type="text" disabled></input>
      </label>
    </div>
  );
}

export default TextInput;

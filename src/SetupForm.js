import React, { useState } from "react";
import { INITIAL } from "./utils/constant";

function SetupForm() {
  const [question, setQuestion] = useState({
    value: INITIAL.RATING_QUESTION,
    touched: false,
    valid: false,
  });
  const handleChangeQuestion = (event) => {
    setQuestion({
      value: event.target.value,
      question,
    });
  };
  return (
    <div>
      <h1>Set Up</h1>
      <form>
        <label>
          Enter your Rating question:
          <input
            type="text"
            value={question.value}
            onChange={handleChangeQuestion}
          />
        </label>
      </form>
    </div>
  );
}

export default SetupForm;

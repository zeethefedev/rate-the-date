import React from "react";

function TextInput({ question, required }) {
  //   const [question, setQuestion] = useState({
  //     value: "",
  //     touched: false,
  //     valid: false,
  //   });

  //   const handleChangeQuestion = (event) => {
  //     setQuestion({
  //       value: event.target.value,
  //       question,
  //     });
  //   };
  return (
    <label>
      Enter your question:
      <input
        type="text"
        value={question.value}
        // onChange={handleChangeQuestion}
      />
    </label>
  );
}

export default TextInput;

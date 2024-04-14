import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./component/TextInput";
import { FORM_MODE } from "./utils/constant";

function Landing() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [formId, setFormId] = useState({
    value: "",
    touched: false,
  });
  const handleMakeForm = () => {
    navigate("/question");
  };

  const handleAnswerForm = () => {
    setShowInput(true);
  };

  const handleFormIdChange = (event) => {
    setFormId({
      value: event.target.value,
      touched: true,
    });
  };

  const goToForm = (event) => {
    event.preventDefault();
    navigate(`/response/${formId.value}`);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleMakeForm}>Make a new form</button>
      <button onClick={handleAnswerForm}>Answer a form</button>
      {showInput && (
        <form>
          <TextInput
            questionValue="Fill your form id here"
            inputValue={formId.value}
            handleInputChange={(event) => handleFormIdChange(event)}
            required
            error={!formId.value && formId.touched}
            mode={FORM_MODE.RESPONSE}
          />
          <button disabled={!formId.value} onClick={goToForm}>
            Go to form
          </button>
        </form>
      )}
    </div>
  );
}

export default Landing;

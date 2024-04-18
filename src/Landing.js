import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./component/TextInput";
import { FORM_MODE } from "./utils/constant";

import "./style/Landing.css";

function Landing() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [formId, setFormId] = useState({
    value: "",
    touched: false,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!formId.value && formId.touched);
  }, [formId]);

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
    <div className="landing-wrapper">
      <h1>Welcome to RTD</h1>
      <div className="landing-button-group">
        <button className="red" onClick={handleMakeForm}>
          Make a new form
        </button>
        <button className="green" onClick={handleAnswerForm}>
          Answer a form
        </button>
      </div>
      {showInput && (
        <form className="form-id-input-wrapper">
          <TextInput
            questionValue="Fill your form id here"
            inputValue={formId.value}
            handleInputChange={(event) => handleFormIdChange(event)}
            required
            error={error}
            mode={FORM_MODE.RESPONSE}
          />
          <button
            className="secondary-button secondary-button-red"
            disabled={!formId.value}
            onClick={goToForm}
            style={{ marginBottom: error ? 22 : 0 }}
          >
            Go to form
          </button>
        </form>
      )}
    </div>
  );
}

export default Landing;

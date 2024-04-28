import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "./component/TextInput";
import { FORM_MODE } from "./utils/constant";

import "./style/Landing.css";

function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInput, setShowInput] = useState(location.state?.showInput);
  const [animation, setAnimation] = useState(location.state?.showInput);
  const [formId, setFormId] = useState({ value: "", touched: false });
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!formId.value && formId.touched);
  }, [formId]);

  const handleMakeForm = () => {
    navigate("/question");
  };

  const handleAnswerForm = () => {
    setAnimation(true);
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
    setFormId({ ...formId, touched: true });
    if (formId.value) {
      navigate(`/response/${formId.value}`);
    }
  };

  return (
    <div className="wrapper">
      <h1>Welcome to RTD</h1>
      <div className="button-group">
        <button className="red" onClick={handleMakeForm}>
          Make a new form
        </button>
        <button className="green" onClick={handleAnswerForm}>
          Answer a form
        </button>
      </div>
      {showInput && (
        <form className={`form-id-input-wrapper ${animation && "fade-in"}`}>
          <TextInput
            questionValue="Fill your form id here"
            inputValue={formId.value}
            handleInputChange={(event) => handleFormIdChange(event)}
            required
            error={error}
            mode={FORM_MODE.RESPONSE}
            buttonLabel="Go to form"
            onButtonClick={goToForm}
          />
        </form>
      )}
    </div>
  );
}

export default Landing;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./component/TextInput";
import { FORM_MODE } from "./utils/constant";
import { useDispatch } from "react-redux";
import { fetchFormById } from "./api/response.thunk";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const goToForm = () => {
    dispatch(fetchFormById(formId.value))
      .unwrap()
      .then(() => {
        navigate(`/response/${formId.value}`);
      })
      .catch((error) => {
        setFormId({ value: "", touched: true });
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleMakeForm}>Make a new form</button>
      <button onClick={handleAnswerForm}>Answer a form</button>
      {showInput && (
        <div>
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
        </div>
      )}
    </div>
  );
}

export default Landing;

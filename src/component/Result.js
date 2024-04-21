import React from "react";
import { useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import "../style/Result.css";
import { resetQuestionForm } from "../store/questionReducer";
import { resetResponseForm } from "../store/responseReducer";
import { useNavigate } from "react-router-dom";

function QuestionFormResult({ formLink }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMakeAnotherClick = () => {
    dispatch(resetQuestionForm());
  };

  const handleAnswerForm = () => {
    navigate("/");
  };

  return (
    <div className="result-content">
      {formLink && (
        <div>
          <div>Here is your link:</div>
          <a href={formLink}>Click here</a>
        </div>
      )}
      <div className="result-button-group">
        <button
          className="primary-button primary-button-red"
          onClick={handleMakeAnotherClick}
        >
          Make another form
        </button>
        <button
          className="primary-button primary-button-yellow"
          onClick={handleAnswerForm}
        >
          Answer a form
        </button>
      </div>
    </div>
  );
}

function ResponseFormResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(resetResponseForm());
  };

  const handleMakeClick = () => {
    navigate("/question");
  };

  return (
    <div>
      <button onClick={handleEdit}>Go back and edit your answer</button>
      <button onClick={handleMakeClick}>Make a form</button>
    </div>
  );
}

function Result({ mode = FORM_MODE.QUESTION, heading, formLink }) {
  return (
    <div className="result-wrapper">
      <h1>{heading || "Form submitted"}</h1>
      {mode === FORM_MODE.QUESTION ? (
        <QuestionFormResult formLink={formLink} />
      ) : (
        <ResponseFormResult />
      )}
    </div>
  );
}

export default Result;

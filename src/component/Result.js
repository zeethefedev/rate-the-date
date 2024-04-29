import React from "react";
import { useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import { resetQuestionForm } from "../store/questionReducer";
import { resetResponseForm } from "../store/responseReducer";
import { useNavigate } from "react-router-dom";

import "../style/Result.css";
import Message from "./Message";

function QuestionFormResult({ formLink }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMakeAnother = () => {
    dispatch(resetQuestionForm());
  };

  const handleAnswerForm = () => {
    navigate("/", { state: { showInput: true } });
  };

  return (
    <div className="result-content">
      {formLink && (
        <div className="result-text">
          <div className="bodytext-l">Here is your link:</div>
          <a className="bodytext-l" href={formLink}>
            Click here
          </a>
          <Message message="You can copy this link and send to someone else." />
        </div>
      )}
      <div className="button-group">
        <button
          className="primary-button primary-button-red"
          onClick={handleMakeAnother}
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

  const handleMakeForm = () => {
    dispatch(resetQuestionForm());
    navigate("/question");
  };

  const handleAnswerForm = () => {
    navigate("/", { state: { showInput: true } });
  };

  return (
    <div className="button-group column-button-group">
      <button
        className="primary-button primary-button-red"
        onClick={handleEdit}
      >
        Edit your answer
      </button>
      <button
        className="primary-button primary-button-yellow"
        onClick={handleMakeForm}
      >
        Make a form
      </button>
      <button
        className="primary-button primary-button-green"
        onClick={handleAnswerForm}
      >
        Answer another form
      </button>
    </div>
  );
}

function Result({ mode = FORM_MODE.QUESTION, heading, formLink }) {
  return (
    <div className="wrapper">
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

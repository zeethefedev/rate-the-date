import React from "react";
import { useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import "../style/Result.css";
import { resetQuestionForm } from "../store/questionReducer";
import { resetResponseForm } from "../store/responseReducer";
import { useNavigate } from "react-router-dom";

function QuestionFormResult({ formLink, handleMakeAnotherClick }) {
  return (
    <div>
      {formLink && (
        <div>
          <div>Here is your link:</div>
          <a href={formLink}>Click here</a>
        </div>
      )}
      <button onClick={handleMakeAnotherClick}>Make another form</button>
    </div>
  );
}

function ResponseFormResult({ handleEdit, handleMakeClick }) {
  return (
    <div>
      <button onClick={handleEdit}>Go back and edit your answer</button>
      <button onClick={handleMakeClick}>Make a form</button>
    </div>
  );
}

function Result({ mode = FORM_MODE.QUESTION, heading, formLink }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMakeAnotherClick = () => {
    dispatch(resetQuestionForm());
  };

  const handleEdit = () => {
    dispatch(resetResponseForm());
  };

  const handleMakeClick = () => {
    navigate("/question");
  };

  return (
    <div className="result-wrapper">
      <h1>{heading || "Form submitted"}</h1>
      {mode === FORM_MODE.QUESTION ? (
        <QuestionFormResult
          formLink={formLink}
          handleMakeAnotherClick={handleMakeAnotherClick}
        />
      ) : (
        <ResponseFormResult
          handleEdit={handleEdit}
          handleMakeClick={handleMakeClick}
        />
      )}
    </div>
  );
}

export default Result;

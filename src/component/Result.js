import React from "react";
import { useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import "../style/Result.css";
import { resetForm } from "../store/questionReducer";

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

function ResponseFormResult({ handleMakeClick }) {
  return (
    <div>
      <button onClick={handleMakeClick}>Make a form</button>
    </div>
  );
}

function Result({ mode = FORM_MODE.QUESTION, heading, formLink }) {
  const dispatch = useDispatch();
  const handleMakeAnotherClick = () => {
    //set forsubmitted = false
    dispatch(resetForm());
  };

  const handleMakeClick = () => {};

  return (
    <div className="result-wrapper">
      <h1>{heading || "Form submitted"}</h1>
      {mode === FORM_MODE.QUESTION ? (
        <QuestionFormResult
          formLink={formLink}
          handleMakeAnotherClick={handleMakeAnotherClick}
        />
      ) : (
        <ResponseFormResult handleMakeClick={handleMakeClick} />
      )}
    </div>
  );
}

export default Result;

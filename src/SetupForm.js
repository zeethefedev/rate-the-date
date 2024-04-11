import React, { useState } from "react";
import { FORM_MODE, MENU_OPTIONS } from "./utils/constant";
import { useSelector } from "react-redux";
import DropdownMenu from "./component/DropdownMenu";
import { useDispatch } from "react-redux";
import {
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
  validatePreview,
} from "./store/questionReducer";
import Question from "./component/Question";
import "./style/Form.css";
import Result from "./component/Result";
import { postForm } from "./api/question.thunk";

function SetupForm() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.reducer.questions);
  const formLoading = useSelector((state) => state.reducer.loading);
  const formSubmitted = useSelector((state) => state.reducer.submitted);
  const [viewMode, setViewMode] = useState(FORM_MODE.QUESTION);

  const handleChangeViewMode = () => {
    if (viewMode === FORM_MODE.QUESTION) {
      setViewMode(FORM_MODE.RESPONSE);
    } else {
      setViewMode(FORM_MODE.QUESTION);
    }
  };

  const handleRemoveQuestion = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(removeQuestion(index));
    }
  };

  const handleMoveQuestionUp = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(moveQuestionUp(index));
    }
  };

  const handleMoveQuestionDown = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(moveQuestionDown(index));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(validatePreview());
  };

  const handleTest = () => {
    dispatch(postForm(questions));
  };

  return (
    <div>
      {formSubmitted ? (
        <Result />
      ) : (
        <div className="setup-form-wrapper">
          <div className="form-editor">
            <DropdownMenu options={MENU_OPTIONS} />
            <label>
              <input
                type="checkbox"
                id="required"
                checked={viewMode === FORM_MODE.RESPONSE}
                onChange={handleChangeViewMode}
              />
              View as User
            </label>
            <button onClick={handleTest}>Submit Form</button>
            {formLoading && <div>Loading...</div>}
          </div>
          <div className="question-editor">
            <h1>Set Up</h1>
            <form>
              {questions.map((question, index) => (
                <div key={index}>
                  <Question
                    index={index}
                    mode={viewMode}
                    question={question}
                    handleRemoveQuestion={(event) =>
                      handleRemoveQuestion(event, index)
                    }
                    handleMoveQuestionUp={(event) =>
                      handleMoveQuestionUp(event, index)
                    }
                    handleMoveQuestionDown={(event) =>
                      handleMoveQuestionDown(event, index)
                    }
                  />
                </div>
              ))}
              {viewMode === FORM_MODE.RESPONSE && (
                <button onClick={handleSubmit}>Submit Answers</button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetupForm;

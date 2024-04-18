import React, { useEffect, useState } from "react";
import { FORM_MODE, MENU_OPTIONS } from "./utils/constant";
import { useSelector } from "react-redux";
import DropdownMenu from "./component/DropdownMenu";
import { useDispatch } from "react-redux";
import {
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
  setQuestions,
  validatePreview,
} from "./store/questionReducer";
import Question from "./component/Question";
import Result from "./component/Result";
import { postForm } from "./api/question.thunk";
import { getFromStorage } from "./utils/methods";
import LoadingOverlay from "./component/LoadingOverlay";

import "./style/Form.css";
import "./style/Question.css";
import "./style/SetupForm.css";

function SetupForm() {
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.QUESTION);
  const questions = useSelector((state) => state.questionReducer.questions);
  const formLoading = useSelector((state) => state.questionReducer.loading);
  const formSubmitted = useSelector((state) => state.questionReducer.submitted);
  const responseFormLink = useSelector(
    (state) => state.questionReducer.responseFormLink
  );
  const [viewMode, setViewMode] = useState(FORM_MODE.QUESTION);

  useEffect(() => {
    if (savedData && savedData.questions) {
      dispatch(setQuestions(savedData.questions));
    }
  }, []);

  const handleChangeViewMode = () => {
    if (viewMode === FORM_MODE.QUESTION) {
      setViewMode(FORM_MODE.PREVIEW);
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

  // const handleTest = () => {
  //   dispatch(fetchForms());
  // };

  const handlePostForm = () => {
    dispatch(postForm(questions));
  };

  return (
    <div>
      {formSubmitted ? (
        <Result formLink={responseFormLink} />
      ) : (
        <div>
          <LoadingOverlay open={formLoading} />
          <div className="setup-form-wrapper">
            <div className="container form-editor">
              {/* <button onClick={handleTest}>Test api</button> */}
              <DropdownMenu options={MENU_OPTIONS} />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="required"
                  checked={viewMode === FORM_MODE.PREVIEW}
                  onChange={handleChangeViewMode}
                />
                View as User
              </label>
              <button className="primary-button-red" onClick={handlePostForm}>
                Submit Form
              </button>
              {formLoading && <div>Loading...</div>}
            </div>
            <div className="container question-editor">
              <h1>Set Up</h1>
              <form className="setup-form-question">
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
                {viewMode === FORM_MODE.PREVIEW && (
                  <button onClick={handleSubmit}>Submit Answers</button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetupForm;
